const SUPABASE_URL='https://gmfvsmbmcgkhzhdxbjjt.supabase.co';
const SUPABASE_KEY='sb_publishable_4A-0ZYzAJs98PV3jdbgopA_MvoJdsgt';
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}}));

const form=document.getElementById('projectForm');
if(form) form.addEventListener('submit',async e=>{
 e.preventDefault();
 const button=form.querySelector('button'), message=document.getElementById('formMessage');
 button.disabled=true; button.textContent='Sending...';
 const data=new FormData(form);
 const payload={name:String(data.get('name')).trim(),phone:String(data.get('phone')).trim(),email:String(data.get('email')).trim(),service:String(data.get('service')).trim(),budget:String(data.get('budget')||'').trim()||null,details:String(data.get('details')).trim()};
 const {error}=await supabaseClient.from('project_requests').insert(payload);
 if(error){message.textContent='Sorry, your request could not be sent. Please use WhatsApp or email below.';button.disabled=false;button.textContent='Send Project Request';return;}
 message.textContent='✓ Request received. I will contact you soon.';
 form.reset(); button.disabled=false; button.textContent='Send Project Request';
});