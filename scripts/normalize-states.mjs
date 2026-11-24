import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const apply = process.argv.includes('--apply')
const require = createRequire(import.meta.url)

// Load compiled-less TS via next-free dynamic transpile is heavy; inline the same aliases.
const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
]
const ALIASES = {
  abia:'Abia',adamawa:'Adamawa',akwaibom:'Akwa Ibom',anambra:'Anambra',bauchi:'Bauchi',bayelsa:'Bayelsa',benue:'Benue',borno:'Borno',crossriver:'Cross River',delta:'Delta',ebonyi:'Ebonyi',ebony:'Ebonyi',edo:'Edo',benincity:'Edo',ekiti:'Ekiti',enugu:'Enugu',fct:'FCT - Abuja',fctabuja:'FCT - Abuja',abuja:'FCT - Abuja',abujafct:'FCT - Abuja',federalcapitalterritory:'FCT - Abuja',abujafederalcapitalterritory:'FCT - Abuja',gombe:'Gombe',imo:'Imo',emo:'Imo',jigawa:'Jigawa',kaduna:'Kaduna',kano:'Kano',katsina:'Katsina',kastina:'Katsina',kebbi:'Kebbi',kogi:'Kogi',kwara:'Kwara',lagos:'Lagos',nasarawa:'Nasarawa',nassarawa:'Nasarawa',nawarawa:'Nasarawa',niger:'Niger',ogun:'Ogun',ondo:'Ondo',osun:'Osun',oyo:'Oyo',plateau:'Plateau',plateu:'Plateau',jos:'Plateau',josplateau:'Plateau',plateaujos:'Plateau',jossouth:'Plateau',rivers:'Rivers',sokoto:'Sokoto',taraba:'Taraba',jalingo:'Taraba',yobe:'Yobe',zamfara:'Zamfara',
}
function compact(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function normalize(raw){
  const original=(raw||'').trim()
  if(!original) return null
  if(compact(original)==='nigeria') return null
  const cleaned=original.toLowerCase()
    .replace(/federal capital territory/g,'fct')
    .replace(/local government|l\.?g\.?a\.?/g,' ')
    .replace(/\bstate\b/g,' ')
    .replace(/south[\s-]*south|south[\s-]*east|south[\s-]*west|north[\s-]*east|north[\s-]*west|north[\s-]*central|middle[\s-]*belt/g,' ')
    .replace(/southeast|southwest|northeast|northwest|northcentral|middlebelt|southsouth/g,' ')
    .replace(/\bislam\b/g,' ')
    .replace(/[^a-z]+/g,' ')
    .replace(/\s+/g,' ')
    .trim()
  if(!cleaned || cleaned==='nigeria') return null
  const key=cleaned.replace(/ /g,'')
  if(ALIASES[key]) return ALIASES[key]
  for(const st of STATES){ if(compact(st)===key) return st }
  for(const st of STATES){
    const stKey=compact(st)
    if(stKey==='niger') continue
    if(key.includes(stKey) && stKey.length>=4) return st
  }
  const first=cleaned.split(' ')[0]
  if(first && ALIASES[first] && first!=='niger') return ALIASES[first]
  return null
}

const env = Object.fromEntries(
  fs.readFileSync(path.resolve('.env.local'),'utf8').split(/\r?\n/).filter(l=>l&&!l.startsWith('#')&&l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(),l.slice(i+1).trim()]})
)
const url=(env.SUPABASE_URL||'').replace(/\/$/,'')
const key=env.SUPABASE_SERVICE_ROLE_KEY
const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'}

const rows=[]
for(let from=0;;from+=1000){
  const r=await fetch(`${url}/rest/v1/conference_registrations?select=registration_id,state&conference_slug=eq.national-congress-2026`,{headers:{...headers,Range:`${from}-${from+999}`}})
  const batch=await r.json()
  rows.push(...batch)
  if(batch.length<1000) break
}

const updates=[]
for(const row of rows){
  const next=normalize(row.state)
  if(next && next!==row.state) updates.push({id:row.registration_id,from:row.state,to:next})
}
console.log(`TOTAL ${rows.length}`)
console.log(`TO UPDATE ${updates.length}`)
const sample=new Map()
for(const u of updates){
  if(!sample.has(u.to)) sample.set(u.to,new Map())
  const m=sample.get(u.to)
  m.set(u.from,(m.get(u.from)||0)+1)
}
for(const [to, variants] of [...sample.entries()].sort((a,b)=>a[0].localeCompare(b[0]))){
  const detail=[...variants.entries()].map(([from,c])=>`${c}x ${JSON.stringify(from)}`).join('; ')
  console.log(`${to}: ${detail}`)
}
if(!apply){
  console.log('DRY RUN. Re-run with --apply to write.')
  process.exit(0)
}
let done=0
for(const item of updates){
  const r=await fetch(`${url}/rest/v1/conference_registrations?registration_id=eq.${encodeURIComponent(item.id)}`,{method:'PATCH',headers,body:JSON.stringify({state:item.to})})
  if(!r.ok) throw new Error(`patch failed ${item.id} ${r.status}`)
  done++
  if(done%50===0 || done===updates.length) console.log(`PATCHED ${done}/${updates.length}`)
}
console.log('DONE')
