<script setup lang="ts">
import { onMounted } from 'vue'

interface prime {
    result: number[][]
    output: number[]
    osztók: number[]
    number_of_osztók: number
    partial_result: number[]
}

onMounted(() => {
    function prime_number_(
        inputnum: number,
        other: boolean
    ): prime | undefined {
        let bekker: prime = {
            result: [[], []],
            output: [],
            osztók: [],
            number_of_osztók: 1,
            partial_result: [],
        }
        const input = Math.abs(inputnum)
        let num = input
        let prime_numbers_under_num = []
        let need_to = true

        const result: number[][] = [[], []]
        let output = []
        const partial_result = []
        let osztók: number[] = []
        let number_of_oszók = 1

        if (inputnum === 0) {
            clear(true)
            return undefined
        }

        const start = performance.now()

        document.querySelector('#oszlopok')?.classList.remove('hidden')
        document.querySelector('#oszlopok')?.classList.add('grid')

        if (prime_numbers(num) === num) {
            output.push(num)
            partial_result.push(num)
            need_to = false
            osztók.push(1)
            osztók.push(num)
            number_of_oszók += 1
        }
        if (num === 1) {
            need_to = false
            osztók = [1]
            number_of_oszók = 1
        }
        if (need_to) {
            for (let index = 2; index < num / 2 + 1; index++) {
                prime_numbers_under_num.push(prime_numbers(index))
            }

            prime_numbers_under_num.push(prime_numbers(num))
            prime_numbers_under_num =
                prime_numbers_under_num.filter(check_if_one)

            for (
                let index = 0;
                index < prime_numbers_under_num.length;
                index++
            ) {
                const element = prime_numbers_under_num[index]

                while (num % element === 0) {
                    output.push(element)
                    partial_result.push(num)
                    num /= element
                }
                if (num === 1) {
                    break
                }
            }
        }

        output = output.filter(check_if_one)
        for (const cucc of output) {
            if (result[0].includes(cucc)) {
                const index = result[0].indexOf(cucc)
                result[1][index]++
            } else {
                result[1].push(1)
                result[0].push(cucc)
            }
        }
        if (other) {
            return bekker
        }
        if (need_to) {
            for (const element of result[1]) {
                number_of_oszók *= element + 1
            }
            const indexes: number[] = []

            for (let i = 0; i < result[0].length; i++) {
                indexes.push(0)
            }
            const more_indexes: number[][] = []
            for (let index = 0; index < number_of_oszók; index++) {
                for (
                    let i = indexes.length - 1;
                    indexes.length > i && i >= 0;
                    i--
                ) {
                    const temp = indexes.slice(0, indexes.length)

                    if (array_in_array(temp, more_indexes)) {
                        more_indexes.push(temp)
                    }

                    if (
                        i !== indexes.length - 1 &&
                        indexes.slice(i + 1, indexes.length).toString() ===
                            result[1]
                                .slice(i + 1, result[1].length)
                                .toString() &&
                        indexes.slice(i, indexes.length).toString() !==
                            result[1].slice(i, result[1].length).toString()
                    ) {
                        indexes[i]++
                        for (let j = 0; j < indexes.length; j++) {
                            if (j > i) {
                                indexes[j] = 0
                            }
                        }
                    }

                    if (
                        i === indexes.length - 1 &&
                        indexes[i] !== result[1][i]
                    ) {
                        indexes[i]++
                    }
                }
                if (indexes.toString() === result[1].toString()) {
                    break
                }
            }
            osztók = more_indexes.map((item) => osztósítás(item, result[0]))
            osztók = quickSort(osztók)
        }

        partial_result.push(1)
        console.log(osztók)

        bekker.number_of_osztók = number_of_oszók
        bekker.osztók = osztók
        bekker.output = output
        bekker.partial_result = partial_result
        bekker.result = result

        const end = performance.now()
        console.log(`Execution time: ${end - start} ms`)
        return bekker
    }

    document
        .querySelector('#prime_number_form')
        ?.addEventListener('submit', (e) => {
            e.preventDefault()
            lnko([12, 6, 24])
            const data = new FormData(e.target as HTMLFormElement)
            const cuccos = prime_number_(
                Number(Object.fromEntries(data.entries()).prime),
                false
            )
            const bal_oldal = document.querySelector('#bal_oldal')
            const jobb_oldal = document.querySelector('#jobb_oldal')
            const summarized = document.querySelector('#summarized')
            const osztócím = document.querySelector('#osztó')
            const osztók_div = document.querySelector('#osztók')
            clear(false)
            if (
                cuccos &&
                bal_oldal &&
                jobb_oldal &&
                summarized &&
                osztócím &&
                osztók_div
            ) {
                for (let i = 0; i < cuccos.partial_result.length; i++) {
                    const element = document.createElement('h2')
                    element.innerText = cuccos.partial_result[i].toString()
                    bal_oldal.appendChild(element)
                }

                for (let i = 0; i < cuccos.output.length; i++) {
                    const element = document.createElement('h2')
                    element.innerText = cuccos.output[i].toString()
                    jobb_oldal.appendChild(element)
                }

                const cím = document.createElement('span')
                cím.classList.add('text-3xl', 'font-bold')
                cím.innerHTML = `${Number(
                    Object.fromEntries(data.entries()).prime
                ).toString()} =&nbsp;`
                summarized.appendChild(cím)

                for (const element of cuccos.result[0]) {
                    const index = cuccos.result[0].indexOf(element)

                    const szám = document.createElement('span')

                    szám.innerText = element.toString()
                    szám.classList.add('text-3xl', 'font-bold')
                    summarized.appendChild(szám)

                    if (cuccos.result[1][index] > 1) {
                        const hatvány = document.createElement('sup')
                        hatvány.innerText = cuccos.result[1][index].toString()
                        hatvány.classList.add('text-base', 'text-xl')
                        szám.appendChild(hatvány)
                    }

                    if (cuccos.result[0][index + 1]) {
                        const szorzócska = document.createElement('span')
                        szorzócska.innerHTML = '&#183;'
                        szorzócska.classList.add('mx-4', 'text-xl', 'font-bold')
                        summarized.appendChild(szorzócska)
                    }
                }

                ;(osztócím as HTMLElement).innerText = `${Number(
                    Object.fromEntries(data.entries()).prime
                )} számú gyárból ${cuccos.number_of_osztók} osztó jött ki:`

                for (const element of cuccos.osztók) {
                    const józsi = document.createElement('h3')
                    józsi.innerText = element.toString()

                    osztók_div.appendChild(józsi)
                }
            }
        })

    function prime_numbers(num: number): number {
        let counter = 0
        for (let index = 2; index <= Math.sqrt(num); index++) {
            if (num % index === 0) {
                counter++
            }
        }
        if (counter === 0) {
            return num
        }

        return 0
    }

    function check_if_one(num: number): boolean {
        return num !== 0
    }

    function array_in_array(keresendo: number[], benne: number[][]): boolean {
        for (const element of benne) {
            if (element.toString() === keresendo.toString()) {
                return false
            }
        }
        return true
    }

    function osztósítás(index: number[], result: number[]): number {
        let output = 1
        for (let i = 0; i < index.length; i++) {
            output *= result[i] ** index[i]
        }
        return output
    }

    function quickSort(arr: number[]): number[] {
        // Base case: If the array has one or no elements, it is already sorted.
        if (arr.length <= 1) return arr

        // Choosing the first element in the array as the pivot.
        const pivot = arr[0]
        // Creating two empty arrays to store elements less than (left) and greater than (right) the pivot.
        const left = []
        const right = []

        // Looping through the array, starting from the second element because the first is the pivot.
        for (let i = 1; i < arr.length; i++) {
            // If the current element is smaller than the pivot, push it to the 'left' array.
            if (arr[i] < pivot) left.push(arr[i])
            // If the current element is greater than or equal to the pivot, push it to the 'right' array.
            else right.push(arr[i])
        }

        // Concatenate the result of recursively sorting the 'left' array, the pivot, and then the 'right' array.
        // Spread syntax '...' is used to concatenate arrays.
        return [...quickSort(left), pivot, ...quickSort(right)]
    }
    function clear(bad: boolean): void {
        const bal_oldal = document.querySelector('#bal_oldal')
        const jobb_oldal = document.querySelector('#jobb_oldal')
        const summarized = document.querySelector('#summarized')
        const osztócím = document.querySelector('#osztó')
        const osztók_div = document.querySelector('#osztók')
        const form = document.querySelector('#prime_number_form')
        const oszlopok = document.querySelector('#oszlopok')

        if (
            bal_oldal &&
            jobb_oldal &&
            summarized &&
            osztócím &&
            osztók_div &&
            oszlopok
        ) {
            bal_oldal.innerHTML = ''
            jobb_oldal.innerHTML = ''
            summarized.innerHTML = ''
            osztók_div.innerHTML = ''
            osztócím.innerHTML = ''

            // oszlopok.classList.remove('hidden')
            if (bad) {
                oszlopok.classList.add('hidden')
                ;(form as HTMLFormElement)?.reset()
            }
        }
    }

    function compareArrays(arrays: number[][]): number[] {
        const output: number[] = []
        let lowest_length = 0
        let shortest_array: number[] = []
        for (const arr of arrays) {
            if (arr.length > lowest_length) lowest_length = arr.length
            shortest_array = arr
        }
        for (let i = 0; i < shortest_array.length; i++) {
            const element = shortest_array[i]
            let count = 0
            for (let j = 0; j < arrays.length; j++) {
                const arr = arrays[j]
                if (arr.includes(element)) count++
            }
            if (count >= lowest_length) output.push(element)
        }

        console.log('output', output)

        return quickSort(output)
    }

    function lnko(numbers: number[]): number[][] {
        clear(false)
        let result: number[][] = [[], []]
        const felbontott: number[][][] = [[], []]
        for (const element of numbers) {
            felbontott[0].push(prime_number_(element, true)!.result[0])
            felbontott[1].push(prime_number_(element, true)!.result[1])
        }
        console.log('felbontott', felbontott)
        result[0] = compareArrays(felbontott[0])

        if (result[0].length !== 0) {
            for (const number of result[0]) {
                let minimum = 10000000
                for (let i = 0; i < felbontott[0].length; i++) {
                    const element = felbontott[0][i]

                    if (felbontott[1][i][element.indexOf(number)] < minimum) {
                        minimum = felbontott[1][i][element.indexOf(number)]
                    }
                }
                result[1].push(minimum)
            }
        } else {
            result = [[1], [1]]
        }
        console.log('result ([12, 13, 24,48])', result)
        return result
    }
})
</script>

<template>
    <Title>Ampix Matek(Gyári munka)</Title>

    <div class="text-white font-mono">
        <div class="text-center items-center justify-center">
            <div class="bg-blue-500 py-5">
                <h1 class="text-3xl mb-3 font-semibold">
                    Prímtényezős felbontás
                </h1>
                <form id="prime_number_form">
                    <input
                        class="bg-blue-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-blue-600 mr-2.5"
                        type="number"
                        name="prime"
                        placeholder="Gyári munka alapanyaga"
                    />
                    <button
                        type="submit"
                        class="bg-blue-400 px-2 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-blue-600"
                    >
                        Feldolgozás
                    </button>
                </form>
            </div>
            <div
                class="flex justify-center items-center bg-blue-600 text-2xl"
                id="summarized"
            ></div>
            <div
                id="oszlopok"
                class="sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mx-5 md:mx-24 mt-5 hidden"
            >
                <div class="bg-blue-500 p-5 rounded-lg">
                    <div
                        class="grid grid-cols-2 bg-slate-700 mx-20 gap-x-1.5 text-xl"
                    >
                        <div
                            id="bal_oldal"
                            class="bg-blue-500 text-right pr-1 text-2xl"
                        ></div>

                        <div
                            id="jobb_oldal"
                            class="bg-blue-500 text-left pl-1 text-2xl"
                        ></div>
                    </div>
                </div>
                <div class="bg-blue-500 p-5 rounded-lg">
                    <h2 id="osztó" class="text-3xl"></h2>
                    <div
                        id="osztók"
                        class="grid grid-cols-5 gap-[1px] text-2xl"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
