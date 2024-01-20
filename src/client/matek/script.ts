function prime_numbers(num:number):number{
    
    let counter = 0;
    for (let index = 2; index <= Math.sqrt(num) ; index++) {
        if (num % index ===0 ){
            counter++;
        }

    }
    if (counter === 0){
        return num;
    }
    
    return 1;

}

function check_if_one(num:number):boolean{
    return num!==1;
}
function check_if_divisible(num:number,diviser:number):boolean{
    return num%diviser===0;
}

function prime_number_(input:number):void{
    let num = input
    let prime_numbers_under_num = [];
    let output = []
    const partial_result =[]
    for (let index = 2; index < num+1; index++) {
        prime_numbers_under_num.push(prime_numbers(index));
    }
    prime_numbers_under_num = prime_numbers_under_num.filter(check_if_one);
    for (let index = 0; index < prime_numbers_under_num.length; index++) {
        const element = prime_numbers_under_num[index];
        
        while (check_if_divisible(num,element)){
            output.push(element)
            partial_result.push(num)
            num /= element
        }
    }
    partial_result.push(1)
    output = output.filter(check_if_one);
    const bal_oldal = document.getElementById("bal_oldal");
    const jobb_oldal = document.getElementById("jobb_oldal");
    if (bal_oldal!= null && jobb_oldal!= null){
    for (let i = 0; i < partial_result.length; i++) {
        const element = document.createElement("h2");
        element.innerText = partial_result[i].toString();
        bal_oldal.appendChild(element);
        
    }
    for (let i = 0; i < output.length; i++) {
        const element = document.createElement("h2");
        element.innerText = output[i].toString();
        jobb_oldal.appendChild(element);
        
    }
    }
}



document.getElementById("prime_number_form")?.addEventListener("submit",(e) =>{
   e.preventDefault();
   const data = new FormData(e.target as HTMLFormElement);
   prime_number_(Number(Object.fromEntries(data.entries()).prime))
})


