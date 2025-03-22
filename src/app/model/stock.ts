// export class Stock {
//     favorite: boolean = false;

//     constructor( 
//         public name: string,
//         public code: string,
//         public price: number,
//         public previousPrice: number,
//         public exchange: string
//     ) {}

//     isPositiveChange(): boolean {
//         return this.price >= this.previousPrice;
//     }
// }


export class Stock {
    id: string;  // Thêm thuộc tính id
    favorite: boolean = false;

    constructor(
        id: string,  // Nhận id từ constructor
        public name: string,
        public code: string,
        public price: number,
        public previousPrice: number,
        public exchange: string
    ) {
        this.id = id;  // Gán id từ constructor vào thuộc tính id
    }

    isPositiveChange(): boolean {
        return this.price >= this.previousPrice;
    }
}
