const SUPABASE_URL='https://gmfvsmbmcgkhzhdxbjjt.supabase.co';
const SUPABASE_KEY='sb_publishable_4A-0ZYzAJs98PV3jdbgopA_MvoJdsgt';
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}}));

const form=document.getElementById('projectForm');
if(form) form.addEventListener('submit',async e=>{
 e.preventDefault();
 const button=form.querySelector('button'), message=document.getElementById('formMessage');
 button.disabled=true; button.textContent='Sending...';
 const data=new FormData(form);
 const payload={name:String(data.get('name')).trim(),phone:String(data.get('phone')).trim(),email:String(data.get('email')).trim(),service:String(data.get('service')).trim(),budget:String(data.get('budget')||'').trim()||null,details:String(data.get('details')).trim()};
 const trackingToken=crypto.randomUUID(); payload.tracking_token=trackingToken; const {error}=await supabaseClient.from('project_requests').insert(payload);
 if(error){
   console.error('Project request error:',error);
   message.textContent='Unable to send request: '+(error.message||'Please try again.');
   button.disabled=false; button.textContent='Send Project Request'; return;
 }
 message.innerHTML='✓ Request received. Save your tracking code: <strong>'+esc(trackingToken)+'</strong>';
 form.reset(); button.disabled=false; button.textContent='Send Project Request';
});

const trackForm=document.getElementById('trackForm');
if(trackForm) trackForm.addEventListener('submit',async e=>{
 e.preventDefault();
 const b=trackForm.querySelector('button'),m=document.getElementById('trackMessage'),r=document.getElementById('trackResult');
 b.disabled=true;b.textContent='Checking...';m.textContent='';r.hidden=true;
 const token=document.getElementById('trackingCode').value.trim(),phone=document.getElementById('trackPhone').value.trim();
 try{
   const res=await fetch(SUPABASE_URL+'/functions/v1/check-project-request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,phone})});
   const out=await res.json();
   if(!res.ok)throw new Error(out.error||'Request not found');
   const q=out.request;
   r.innerHTML='<h3>Request status: '+esc(q.status.replace('_',' '))+'</h3><p><strong>Service:</strong> '+esc(q.service)+'<br><strong>Submitted:</strong> '+new Date(q.created_at).toLocaleString()+'</p><p><strong>Your project:</strong> '+esc(q.details)+'</p>'+(q.admin_reply?'<div class="reply-box"><strong>Response from Aabanbio:</strong><p>'+esc(q.admin_reply)+'</p></div>':'<p>Your request has been received. A response will appear here when it is available.</p>');
   r.hidden=false;
 }catch(err){m.textContent=err.message}
 finally{b.disabled=false;b.textContent='Check Request'}
});
