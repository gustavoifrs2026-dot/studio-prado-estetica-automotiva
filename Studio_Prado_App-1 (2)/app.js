const services = [
["🚘","Lavagem detalhada","Lavagem completa com atenção aos detalhes e acabamento.","R$ 250,00"],
["🧼","Higienização interna","Limpeza profunda do interior. Valor varia conforme o estado e tamanho do veículo.","R$ 350,00 a R$ 650,00"],
["✨","Polimento","Polimento para renovar o brilho e melhorar o acabamento da pintura.","R$ 500,00"],
["🛡️","Vitrificação de plásticos","Tratamento e proteção de plásticos externos.","R$ 150,00"],
["🏍️","Lavagem detalhada de motos","Cuidado detalhado para sua moto, com limpeza e acabamento.","R$ 120,00"],
["💎","Tratamento de vidros","Tratamento para melhorar o acabamento e a proteção dos vidros.","R$ 150,00"],
["💡","Restauração de faróis","Restauração para recuperar a aparência e a transparência dos faróis.","R$ 200,00"],
["🔧","Limpeza de motor","Limpeza cuidadosa do cofre do motor.","R$ 150,00"],
["🚿","Lavagem tradicional","Lavagem para a manutenção do veículo no dia a dia.","R$ 50,00 a R$ 70,00"],
["🏍️","Lavagem tradicional de moto","Lavagem de manutenção para motos.","R$ 45,00 a R$ 60,00"],
["🪑","Tratamento em couro","Limpeza e tratamento para conservar o couro do interior.","R$ 150,00"]
];

const grid = document.getElementById("serviceGrid");
const select = document.getElementById("servico");
services.forEach((s,i)=>{
  const card=document.createElement("article");
  card.className="service";
  card.innerHTML=`<div class="icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><div class="price">${s[3]}</div><a class="btn primary" href="#agendamento" onclick="selectService(${i})">Agendar</a>`;
  grid.appendChild(card);
  const opt=document.createElement("option");
  opt.value=s[1]; opt.textContent=`${s[1]} — ${s[3]}`; select.appendChild(opt);
});

function selectService(i){select.selectedIndex=i; document.getElementById("agendamento").scrollIntoView({behavior:"smooth"});}
function toggleMenu(){const n=document.getElementById("nav"); n.style.display=n.style.display==="flex"?"none":"flex";}
function closeMenu(){if(innerWidth<=900) document.getElementById("nav").style.display="none";}

const date=document.getElementById("data");
const now=new Date(); now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
date.min=now.toISOString().slice(0,10);

date.addEventListener("change",()=>{
  const d=new Date(date.value+"T12:00:00");
  const day=d.getDay(); // 0 domingo
  const h=document.getElementById("horario"); h.innerHTML="";
  const start=day===0?8*60:13*60+30;
  const end=day===0?14*60:18*60;
  if(day===0 || (day>=1 && day<=6)){
    for(let m=start;m<end;m+=30){
      const hh=String(Math.floor(m/60)).padStart(2,"0"), mm=String(m%60).padStart(2,"0");
      const o=document.createElement("option"); o.value=`${hh}:${mm}`; o.textContent=`${hh}:${mm}`; h.appendChild(o);
    }
  }
});

document.getElementById("bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const nome=document.getElementById("nome").value.trim();
  const veiculo=document.getElementById("veiculo").value.trim();
  const servico=document.getElementById("servico").value;
  const data=document.getElementById("data").value.split("-").reverse().join("/");
  const horario=document.getElementById("horario").value;
  const obs=document.getElementById("obs").value.trim();
  const msg=`Olá, Studio Prado! Gostaria de solicitar um agendamento.%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*Veículo:* ${encodeURIComponent(veiculo)}%0A*Serviço:* ${encodeURIComponent(servico)}%0A*Data:* ${data}%0A*Horário:* ${horario}%0A*Observação:* ${encodeURIComponent(obs || "Nenhuma")}`;
  window.open(`https://wa.me/5554996339326?text=${msg}`,"_blank");
});
document.getElementById("year").textContent=new Date().getFullYear();

if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
