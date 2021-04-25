window.onload = function () {
 var canvas = document.getElementById("c1");
 var a = canvas.getContext("2d");
 var yaricap = canvas.height/2;
 //yarıçapı canvas yüksekliğinin yarısı olarak belirledik.
 a.translate(yaricap , yaricap);
 //merkez noktasını x=yarıçap y= yarıçap yaparak canvasın tam ortası olarak ayarladık.
 yaricap = yaricap * 0.9;
 //saat canvasın dışına taşmasın diye yarıçapın 9/10unu aldık.


 function calistir(){
       saatCiz(a, yaricap);
       numaraYaz(a,yaricap);
       baslat();
    }

  setInterval(calistir);
    //calistir isimli bir fonksiyon yazdık ve içine saatCiz değerlerini gönderip çalıştırdık.
 function saatCiz(a,yaricap){
     var grd;

     a.beginPath();
     a.arc(0, 0, yaricap, 0, Math.PI*2);
     a.fillStyle="grey";
     a.fill();
     //.beginPath ile a üzerinde yeni değişiklikler yapmaya başladık.
     //arc ile çemberi çiziyorduk. 0,0 noktası, merkez noktası oldu.
     grd = a.createRadialGradient(0, 0, yaricap*0.95, 0, 0, yaricap*1.05);
     grd.addColorStop(0,"black");
     grd.addColorStop(0.5,"white");
     grd.addColorStop(1,"black");
     //saatin çerçevesini yaptık.
     a.strokeStyle = grd;
     a.lineWidth = yaricap*0.1;
     a.stroke();

     a.beginPath();
     a.arc(0, 0, yaricap*0.08 , 0 , Math.PI*2);
     a.fillStyle = "black";
     a.fill();
     //saatin tam merkezindeki küçük çemberi yaptık.
    }

    function numaraYaz(a, yaricap){
        var aci;
        var sayi;
        a.font = yaricap* 0.1 + "px Arial";
        a.textBaseLine = "middle";
        a.textAlign = "center";

        for (sayi = 1 ; sayi<13 ; sayi++){
            aci = sayi * Math.PI / 6;
            a.rotate(aci);
            a.translate(0 , -yaricap * 0.85);
            a.rotate(-aci);
            a.fillText(sayi.toString(), 0, 0);
            a.rotate(aci);
            a.translate(0, yaricap * 0.85);
            a.rotate(-aci);
        }
    }
    //saatleri (12,1,2,3..) yazmak için a ve yaricap değerlerini barındıran bir fonk yazdık.
    //a'nın fontu , piksel cinsinde yarıçapın 0.15 katı olsun dedik.
    //aci = sayi*Math.PI/6 dememizin sebebi, sayı 1ken 30derece, 12yken 360 derece olması için.
    
    function olustur(a,position,length,width){
        a.beginPath();
        lineWidth = width;
        a.lineCap = "round";
        a.moveTo(0,0);
        a.rotate(position);
        a.lineTo(0,-length);
        a.stroke();
        a.rotate(-position);
    }
    //linecap round ile , çizginin sonunu yuvarladık.

    function baslat(){
        var date = new Date();
        var saat = date.getHours();
        var dakika = date.getMinutes();
        var saniye = date.getSeconds();

        saat = saat % 12 ;

        saat = (saat * Math.PI/ 6) + (dakika * Math.PI/(6*60))+
               (saniye* Math.PI/(360*60));

            olustur(a, saat, yaricap*0.5, yaricap*0.08);

         dakika =(dakika * Math.PI/30)+
               (saniye* Math.PI/(30*60));

            olustur(a, dakika, yaricap*0.8, yaricap*0.08);

         saniye =  (saniye* Math.PI/30);

            olustur(a, saniye, yaricap * 0.9 , yaricap*0.03);
    }
};