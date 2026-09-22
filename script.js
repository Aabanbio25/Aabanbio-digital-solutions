document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}}));

const form=document.getElementById('projectForm');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent('New Project Request - Aabanbio Digital Solutions');
  const body=encodeURIComponent(
`Hello Isaac,

I would like to discuss a project with Aabanbio Digital Solutions.

Name: ${data.get('name')}
WhatsApp / Phone: ${data.get('phone')}
Email: ${data.get('email')}
Service: ${data.get('service')}
Budget: ${data.get('budget') || 'Not specified'}

Project details:
${data.get('details')}

Thank you.`);
  window.location.href=`mailto:isaacgbevillah04@gmail.com?subject=${subject}&body=${body}`;
});