function prime_numbers(num:number):number{
    
    let counter:number = 0;
    for (let index = 2; index <= num/2 ; index++) {
        if (num % index ==0 ){
            counter++;
        }

    }
    if (counter == 0){
        return num;
    }
    
    return 1;

}

function check_if_one(num:number):boolean{
    return num!=1;
}

function prime_number_(num:number):void{
    let prime_numbers_under_num = [];
    let output = []
    for (let index = 2; index < num+1; index++) {
        prime_numbers_under_num.push(prime_numbers(index))
    }
    for (let index = 0; index < prime_numbers_under_num.length; index++) {
        const element = prime_numbers_under_num[index];
        if (num%element ==0){
            output.push(element)
            num = num/element
        }
    
    }
    output = output.filter(check_if_one);
    document.getElementById("output").innerHTML = output.toString();
    
}


document.getElementById("gombocska")?.addEventListener("click",(e) =>{
   e.preventDefault(); 
   prime_number_(20)
})


