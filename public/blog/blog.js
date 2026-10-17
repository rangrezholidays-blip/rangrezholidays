(function(){
var form=document.getElementById('enquiry-form');if(!form)return;
var msg=form.querySelector('.form-msg'),btn=form.querySelector('button[type=submit]');
var d=form.querySelector('input[name=startDate]');
if(d){var t=new Date();t.setMinutes(t.getMinutes()-t.getTimezoneOffset());d.min=t.toISOString().slice(0,10);}
function show(text,cls){msg.textContent=text;msg.className='form-msg '+cls;}
form.addEventListener('submit',function(e){
e.preventDefault();
var f=new FormData(form);
if(f.get('website')){return;} /* honeypot: bots fill this hidden field */
var name=(f.get('fullName')||'').trim(),phone=(f.get('phone')||'').trim(),email=(f.get('email')||'').trim();
if(!name){show('Please enter your name.','err');form.fullName.focus();return;}
if(phone.replace(/\D/g,'').length<8){show('Please enter a valid phone number.','err');form.phone.focus();return;}
if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){show('Please check your email address.','err');form.email.focus();return;}
var payload={type:'custom_plan',source:f.get('source'),fullName:name,phone:phone,email:email,
packageName:f.get('packageName')||'',startDate:f.get('startDate')||'',adults:parseInt(f.get('adults'),10)||2,
specialRequests:(f.get('specialRequests')||'').trim()};
btn.disabled=true;btn.textContent='Sending…';show('','');
fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
.then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});})
.then(function(res){
if(res.ok&&res.j.success){location.href='/thank-you?ref='+encodeURIComponent(res.j.inquiryId)+(res.j.guestEmailSent?'&mail=1':'');return;}
throw new Error(res.j&&res.j.error||'failed');})
.catch(function(){
show('Sorry, we could not send that. Please try again or message us on WhatsApp: +91 97604 02549.','err');
btn.disabled=false;btn.textContent='Send enquiry';});
});
})();
