
const app1 = () => {
  //Primera funcion closure
  const crearClosure = () => {
      let mensajeSecreto="Yo soy tu closure";
      return () => {
          console.log(mensajeSecreto);
      }
  }

  const miClosure=crearClosure();
  miClosure();

  //---------- Scope lexico -----------
  let nivelGlobal="Soy global";

  const funcionExterna=()=>{
    let nivelExterno="Soy del scope externo";
    const funcionInterna=()=>{
        let nivelInterno="Soy del scope interno";
        console.log(nivelGlobal);
        console.log(nivelExterno);
        console.log(nivelInterno);
    }
    funcionInterna();
  };
  funcionExterna();

  //Ejercicio encapsulacion
  /*
    objetoPublico saldo, retirarDinero(cantidad)  <----- retirar ese dinero del saldo

  */

    console.log('==========================================================')

    const objetoPublico={
        saldo:100,
        retirarDinero:function(cantidad){
            this.saldo-=cantidad;
        },

    };

    objetoPublico.retirarDinero(50);
    console.log(objetoPublico.saldo);


    const cuentaBancaria=(saldoInicial=0)=>{
        //saldo ha de ser private
        let saldo=saldoInicial;

        return {
            obtenerSaldo:()=>saldo,
            depositar:(cantidad)=> {
                if(cantidad>0){
                    saldo+=cantidad
                    console.log(`Cantidad ${cantidad} añadidia. EL nuevo saldo es ${saldo}`)
                }
                return true
            },
            retirarDinero:(cantidad)=>{
                if(cantidad>saldo){
                    console.log(`No puedes retirar esa cantidad. El saldo es ${saldo}`);
                    return false;
                }
                if(cantidad>0){
                    saldo-=cantidad
                    console.log(`Cantidad ${cantidad} retirada. EL nuevo saldo es ${saldo}`)
                    return true;
                };
            },
        };

    }
    
    const cuenta1=cuentaBancaria(1000);
    cuenta1.depositar(500);
    cuenta1.retirarDinero(1000);

    const cuenta2=cuentaBancaria(2000);
    

    console.log("==========================================")
    
    //Crear un contador que pueda incrementar y decrementar, resetear y obtener el valor actual
    //Se pide crear dos contadores uno que empiece en 10 y vaya hasta el 0 y otro que empiece en 0 y vaya hasta el 10
    //Ejemplificar usando un temporizador de un segundo como los contadores uno sube y otro baja utilizando los metodos
    //del contador. Usa setInterval(funcion,tiempo)

    const contador=(valorInicial=0)=>{
        let contador=valorInicial;
        return {
            obtenerContador:()=>contador,
            incrementar:(numero=1)=>contador+=numero,
            decrementar:(numero=1)=>contador-=numero,
            resetear:()=>contador=valorInicial,
        }
    }

    const contador1=contador(0);
    const contador2=contador(10);

    const interval=setInterval(()=>{
        console.log("Contador1: ",contador1.incrementar());
        console.log("Contador2: ",contador2.decrementar());
        console.log("=========================================")
        if(contador1.obtenerContador()==10){
            clearInterval(interval);
        }
    },1000)

    //Ejemplificar un carrito de la compra persisitente utilizando closure y estableciendo la persistencia a traves
    // de una base de datos sqlite3 . Que permita insertar productos, insertar cantidad de productos, eliminar productos
    // y calcular total de la compra.



}


function app() {
    // Abrir o crear una base de datos
    const carrito=()=>{
        
    }

    
    carrito();
    
}

export default app



