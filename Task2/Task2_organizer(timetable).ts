//Task2_organizer(timetable)

type IMan = {
    name: string,
    interests: string[],
    email: string,
    freeRange: {
      startDate: Date,
      endDate: Date,
    }
}

interface IMeetGroup {
    intersArr: IMan[];
    includePerson(man: IMan): boolean;
    exludePerson(mail: string): boolean;
    getAll(): IMan[];

}

const phoneList = [
    {
      name: 'Александра',
      interests: ['games', 'computers'],
      email: 'alexandra@rambler.ru',
      freeRange: {
        startDate: new Date('01.01.2020'),
        endDate: new Date('03.10.2020'),
      }
    },
    {
      name: 'Василий',
      interests: ['games'],
      email: 'vasiliy@mail.ru',
      freeRange: {
        startDate: new Date('02.05.2020'),
        endDate: new Date('02.25.2020'),
      }
    },
    {
      name: 'Роман',
      email: 'roman@yandex.ru',
      interests: ['javascript'],
      freeRange: {
        startDate: new Date('05.01.2020'), // 1 мая
        endDate: new Date('06.10.2020'), // 10 июня
      }
    },
    {
      name: 'Егор',
      email: 'egor@gmail.ru',
      interests: ['computers', 'javascript'],
      freeRange: {
        startDate: new Date('03.01.2020'), // 1 марта
        endDate: new Date('08.10.2020'), // 10 августа
      }
    },
  ];

function createGroup(interesName: string): IMeetGroup {
    
    let intersArr: IMan[] = [];
    return  {
        intersArr,
        includePerson: (man: IMan) => {
            let itogBool = false;
            man.interests.forEach(elem => {
                if (interesName === elem) {
                    intersArr.push(man);
                    itogBool = true;
                } 
            });
            console.log(itogBool);
            return itogBool;
        },

        exludePerson: (mail: string) => {
            let itogBool = false;
            for (let i=0; i < intersArr.length; i++) {
                if (intersArr[i].email === mail) {
                    intersArr.splice(i, 1);
                    itogBool = true;
                } 
            }
            console.log(itogBool);
            return itogBool;
        },
        
        getAll: () => {
            console.log(intersArr);
            return intersArr;
        },
    }
}

//const javaScriptGroup = createGroup('javascript');

//javaScriptGroup.includePerson(phoneList[2]); // true
//javaScriptGroup.includePerson(phoneList[0]); // false
//javaScriptGroup.includePerson(phoneList[3]); // true

//javaScriptGroup.exludePerson('vasiliy@mail.ru'); // false
//javaScriptGroup.exludePerson('roman@yandex.ru'); // true

//javaScriptGroup.getAll();

function findMeetingMembers(createGroup: IMeetGroup , date: Date): IMan[] {
    let meetGroup: IMan[] = [];
    createGroup.intersArr.forEach(element => {
        if (+date <= +element.freeRange.endDate && +date >= +element.freeRange.startDate) {
            meetGroup.push(element);
        }      
    });
    console.log(meetGroup);
    return meetGroup;
}

//const JScriptGroup = createGroup('javascript');

//JScriptGroup.includePerson(phoneList[2]); // true
//JScriptGroup.includePerson(phoneList[3]); // true

//findMeetingMembers(JScriptGroup, new Date('10.10.2020')); // 0
//findMeetingMembers(JScriptGroup, new Date('06.10.2020')); // 2

function findMeetingDateWithMaximumMembers(createGroup: IMeetGroup ): Date | string {
    let itogDate: Date | string = "нет подходящей даты";   
    createGroup.intersArr.forEach(element => {
        createGroup.intersArr.forEach(el => {
            if (+element.freeRange.startDate > +el.freeRange.startDate &&
                +element.freeRange.endDate < +el.freeRange.endDate) {
                    itogDate = element.freeRange.startDate;
            }
            if (+el.freeRange.startDate > +element.freeRange.startDate &&
                +el.freeRange.endDate < +element.freeRange.endDate) {
                 itogDate = el.freeRange.startDate;
            }
        });
    });
    console.log(itogDate);
    return itogDate;
}

const gamesGroup = createGroup('games');
gamesGroup.includePerson(phoneList[0]); // true
gamesGroup.includePerson(phoneList[1]); // true

findMeetingDateWithMaximumMembers(gamesGroup); // 02.05.2020



