// Task1_organizer(HappyBirthday)

interface NameDateObj {
    name: string;
    birthday: string | Date;
}

let telbook: NameDateObj[] = [{ name: 'Андрей', birthday: '27.02.1995' },
    { name: 'Олег', birthday: '21.08.2002' }, { name: 'Ирина', birthday: '19.08.2003' },
    { name: 'Сергей', birthday: '11.02.1968' }, { name: 'Алексей', birthday: '12.12.1991'},
    { name: 'Петр', birthday: '1.01.1978' }, { name: 'Аня', birthday: '05.07.1978'}
];

let invalidBook1:any = [];
let invalidBook2:any = 768;
let invalidBook3:any = [{name: "Роман", age: 29}];
let date: string = "01.01.2000";
let invalidDate: string = 'ks.12.189k';

function getNextBirthdays(book: NameDateObj[], date: string): NameDateObj[] {
    let itogArr:NameDateObj[] = [];

    if (!Array.isArray(book)) {
        console.log(itogArr);
        return itogArr;

    } else {
        let regDate: RegExp = new RegExp(/\d{2}.\d{2}.\d{4}/);
        let regName: RegExp = new RegExp(/^[А-ЯЁ][а-яё]/);

        book.forEach(elem => {
            if (regName.test(elem.name) && regDate.test(String(elem.birthday))) {
            
                let splitSentDate: string[] = date.split(".");
                let sentDate: Date = new Date(2022, Number(splitSentDate[1]) - 1, Number(splitSentDate[0]));
            
                let splitDateBook: string[] = String(elem.birthday).split(".");
                let dateObj = new Date(Number(splitDateBook[2]), Number(splitDateBook[1]) - 1, Number(splitDateBook[0]));
                elem.birthday = dateObj;

                let bookDate = new Date(2022, elem.birthday.getMonth(), elem.birthday.getDate());
                if (+bookDate >= +sentDate) {
                    itogArr.push(elem)
                }
            }
        })
    
        if (itogArr.length > 0) {
            itogArr.sort(function(one, two) {
                if (new Date(one.birthday).getMonth() < new Date(two.birthday).getMonth()) return -1;
                if (new Date(one.birthday).getMonth() === new Date(two.birthday).getMonth() &&
                    new Date(one.birthday).getDate() < new Date(two.birthday).getDate()) return -1;

                if (new Date(one.birthday).getMonth() > new Date(two.birthday).getMonth()) return 1;
                if (new Date(one.birthday).getMonth() === new Date(two.birthday).getMonth() &&
                    new Date(one.birthday).getDate() > new Date(two.birthday).getDate()) return -1;
                    return 0;
            });

            itogArr.forEach(el => {
                el.birthday = new Date(el.birthday).toLocaleDateString()
            })
        }
        return itogArr;
    }
}

//getNextBirthdays(telbook, date);


interface IMothList {
    month: string,
    friends: NameDateObj[]
}

function getMonthsList(book:NameDateObj[]): IMothList[] {
    
    let itogList: IMothList[] = [];
    if (!Array.isArray(book)) {
        console.log(itogList);
        return itogList;

    } else {
        
        let arrBook: NameDateObj[] = getNextBirthdays(book, '01.01.2022');
        arrBook.forEach(elem => {
            let splitSentDate: string[] = String(elem.birthday).split(".");
            let sentDate: Date = new Date(2022, Number(splitSentDate[1]) - 1, Number(splitSentDate[0]));
            elem.birthday = sentDate;
        });  

        const months = ['Январь', 'Февраль', 'Март', 'Апрель',
                        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        let mapList = arrBook.reduce((acc, cur) => {
            if (months[new Date(cur.birthday).getMonth()]) {
                let name: string = months[new Date(cur.birthday).getMonth()];    
                if (acc.get(name) !== undefined) {
                    let arrCur = acc.get(name)
                    arrCur.push(cur)
                    acc.set(name, arrCur)
                }
                else {
                    acc.set(name, [cur]);
                }                
            }
            return acc 
            
        }, new Map<string, NameDateObj[]>());
        
        for (let [keys, values] of mapList) {
            values.forEach(el => {
                el.birthday = new Date(el.birthday).toLocaleDateString()
            });
            let a = {month: keys, friends: values };
            itogList.push(a)
        }
        console.log(itogList);
        return itogList;
    }
}

getMonthsList(telbook);


interface IWishList {
    title: string,
    price: number,
}

interface IitogPriceArr {
    friendsList:
            { name: string,
              birthday: string | Date,
              wishList?: IWishList[] }[],

    totalPrice: number
}

interface IPresentsList extends NameDateObj {
    wishList?: IWishList[]
}

const phoneList: IPresentsList[] = [
    { name: "Александра",
    birthday: '21.05.2001',
    wishList: [
        { title: 'Книга "Изучаем программирование на JavaScript"',
         price: 250 },
        { title: 'Билет на концерт Макса Коржа',
         price: 1500 },
        { title: 'Книга "Чистый код. Создание, анализ и рефакторинг"',
         price: 200 },
        ],
    },
    
    { name: "Егор",
    birthday: '06.08.1976',
    wishList: [
        { title: 'Готовой абонимент в билиотеку',
         price: 400 },
        { title: 'Шариковая ручка',
         price: 750 },
        ],
    },
    
    { name: "Роман",
     birthday: '14.04.2000'
    },

    { name: "Василий",
     birthday: '27.02.1980',
     wishList: [
        { title: 'Готовой курс обучения на ИРИТ-РтФ',
         price: 100500 },
        { title: 'Путешествие на Марс',
         price: 999999999 },
        ],
    },
]


function getMinimumPresentsPrice( phoneList:IPresentsList[] ): IitogPriceArr | [] {
    
    if (!Array.isArray(phoneList)) {
        console.log([]);
        return [];
    
    } else {
        
        let noGift: IWishList = {title: 'undefined', price: 0};
        let itogPriceArr: IitogPriceArr = {friendsList: [], totalPrice: 0};

        phoneList.forEach(element => {
            if (element.wishList !== undefined) {
                element.wishList.sort(function(one, two){
                    if(one.price < two.price) return -1;
                    if (one.price > two.price) return 1;
                    return 0
                })
            }
            if (element.wishList === undefined) {
                element.wishList = [];
                element.wishList.push(noGift);
            }
        })

        phoneList.forEach(elem => {
            if ( elem.wishList.length > 0 ) {
                elem.wishList.splice(1, elem.wishList.length);
            }
        });

        phoneList.forEach(el => { 
            itogPriceArr.friendsList.push(el);
            el.wishList.forEach(el2 => {
                itogPriceArr.totalPrice += el2.price; 
            })     
        });
        console.log(itogPriceArr)
        return itogPriceArr
    }
}

getMinimumPresentsPrice(phoneList);