function prime_numbers(num:number):number{
    
    let counter:number = 0;
    for (let index = 2; index <= Math.sqrt(num) ; index++) {
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
    for (let index = 2; index < num; index++) {
        prime_numbers_under_num.push(prime_numbers(index));
    }
    for (let index = 0; index < prime_numbers_under_num.length; index++) {
        const element = prime_numbers_under_num[index];
        if (num%element ==0){
            output.push(element)
            num /= element
        }
    }
    output = output.filter(check_if_one);
    const element = document.getElementById("output")
    if (element) {
    element.innerHTML = output.toString();
    }
}


document.getElementById("prime_number_form")?.addEventListener("submit",(e) =>{
   e.preventDefault();
   const data = new FormData(e.target as HTMLFormElement);
   prime_number_(Object.fromEntries(data.entries()).prime)
})


