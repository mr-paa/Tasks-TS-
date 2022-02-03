// Task3_bankomate


interface IClient {
    name: string,
    balance: number, 
};

interface IBank {
    clients: IClient[],
    bankName: string,
    addClient(client: IClient): boolean,
    removeClient(client: IClient): boolean,
}

interface INotesRepos {
    5000?: number,
    2000?: number,
    1000?: number,
    500?: number,
    200?: number,
    100?: number,
    50?: number,
    10?: number,
};

interface IBankomat {
    bank: IBank,
    notesRepository: INotesRepos,
    currentClient: undefined | IClient, 

    setClient(client: IClient): boolean,
    
    removeClient(): boolean,

    addMoney(...denomination: INotesRepos[]): void; 

    giveMoney(money: number): INotesRepos,

}

function createClient(name:string, balance: string | number): IClient {    
    balance = +balance;
    return  {
         name: name,
         balance: balance,
     }   
}

function createBank( bankName: string, clients?: IClient[] ): IBank {
    if (clients === undefined) {
        clients = []
    }
    return  {
        clients,
        bankName: bankName,

        addClient: (client: IClient) => {
            let resBoolAdd: boolean = false;
             
            if (clients.length === 0) {
                clients.push(client);
                resBoolAdd = true;
            } else {
                clients.forEach(elem => {
                    if (client.name !== elem.name) {
                        clients.push(client);
                        resBoolAdd = true;
                    } else {
                        throw new Error('Такой клиент был занесен в список клиентов раннее.');
                    } 
                });
            }
            console.log(resBoolAdd);
            return resBoolAdd;
        },
        
        removeClient: (client: IClient) => {
            let resBoolRemov: boolean = false;
            for (let i=0; i < clients.length; i++) {
                if (clients[i].name === client.name) {
                    clients.splice(i, 1);
                    resBoolRemov = true;
                }     
            }
            if (resBoolRemov === false) {
                throw new Error('Такой клиент не находится в списке клиентов.');
            }
            console.log(resBoolRemov);
            return resBoolRemov;
        }   
    }
}

function createBankomat(BankNotesRepository: INotesRepos, bank: IBank): IBankomat {
    let activClient: undefined | IClient = undefined;
    return  {
        bank: bank,
        notesRepository: BankNotesRepository,
        
        currentClient: activClient,
        
        setClient: (client: IClient) => {
            let clientInit: boolean = false;
            bank.clients.forEach(elem => {
                if ( elem.name === client.name  &&
                    activClient === undefined) {
                    activClient = client
                    clientInit = true;
                }
            });
            if (clientInit === false) {
                throw new Error('Клиент не является клиентом банка или с банкоматом работает другой клиент.');
            }
            console.log(clientInit);
            return clientInit;
        },

        removeClient: () => {
            if (activClient === undefined) {
                console.log(false);
                return false
            }
            if (activClient !== undefined) {
                console.log(true);
                return true;          
            }
        },

        addMoney: (... denomination: INotesRepos[] ) => {
            
            let addSumClient: number = 0;

            if (activClient !== undefined) {
                denomination.forEach(el1 => {
                    for (let key in el1) {
                        BankNotesRepository[Number(key)] += Number(el1[key]);
                        addSumClient += Number(el1[key]) * Number(key);
                    } 
                });
                activClient.balance += addSumClient;
                console.log('Произошло пополнение на сумму:', addSumClient , '\n' + 'Теперь ваш баланс:', activClient.balance);

            } else {
                throw new Error('Клиент в данный момент не работает с банкоматом')
            }  
        },

        giveMoney: (money: number) => {
            
            if (activClient !== undefined) {
                let count = 0;
                
                if (activClient.balance < money) {
                    throw new Error('На вашем счету недостаточно средств.');
                }
                if (money % 10 !==0) {
                    throw new Error('Сумма выдачи должна быть кратна 10.');
                }

                for (let key in BankNotesRepository) {
                    count += BankNotesRepository[key] * Number(key);
                }
                if (money > count) {
                    throw new Error('В банкомате недостаточно купюр')
                }

                let giveSumObj: INotesRepos = { 5000: 0, 2000: 0, 1000: 0, 500: 0,
                    200: 0, 100: 0, 50: 0, 10: 0 };
                let arrDen: number[] = [5000, 2000, 1000, 500, 200, 100, 50, 10];

                for (let key = 0; key < arrDen.length; key++) {
                    while (money >= arrDen[key]) {
                        if ( Number(BankNotesRepository[arrDen[key]]) === 0 ) {
                            break;
                        } else {
                            money -= arrDen[key];
                            BankNotesRepository[arrDen[key]] -= 1;
                            activClient.balance -= arrDen[key];
                            giveSumObj[arrDen[key]] += 1;
                        }
                    }
                }
                console.log('Выдано:', giveSumObj, '\n' + 'Теперь ваш баланс:', activClient.balance);
                return giveSumObj
            } else {
                throw new Error('Клиент в данный момент не работает с банкоматом')
            }
        }
    }
}

const greenBankNotesRepository = {
    5000: 2,
    2000: 3,
    1000: 13,
    500: 20,
    200: 10,
    100: 5,
    50: 2,
    10: 5,
};
const greenBank = createBank('GREENBANK');
/**
 * {
 *   bankName: 'GREENBANK',
 *   clients: [],
 *   ...
 * }
 */
const greenBankBankomat = createBankomat(greenBankNotesRepository, greenBank);
/**
 * {
 *   notesRepository: greenBankNotesRepository,
 *   bank: greenBank,
 *   ...
 * }
 */
const clientVasiliy = createClient('Василий', 2500);
/**
 * {
 *   name: 'Василий',
 *   balance: 2500,
 * }
 */
greenBank.addClient(clientVasiliy); // true
//greenBank.addClient(clientVasiliy); // Error

greenBankBankomat.setClient(clientVasiliy); // true
greenBankBankomat.addMoney( { 50: 3, 10: 8, 200: 3 }, {1000:2}, {500:7} );
greenBankBankomat.giveMoney(1450);
greenBankBankomat.removeClient() // true
console.log(greenBankBankomat.notesRepository);