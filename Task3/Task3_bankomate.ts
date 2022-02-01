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
            activClient = undefined;
            console.log(true);
            return true;          
        },

        addMoney: (... denomination: INotesRepos[] ) => {
            
            let addSumClient: number = 0;
            denomination.forEach(elem => {
                if (elem[5000] !== undefined) {
                    BankNotesRepository[5000] += elem[5000];
                    addSumClient += elem[5000] * 5000;
                }
                if (elem[2000] !== undefined) {
                    BankNotesRepository[2000] +=elem[2000];
                    addSumClient += elem[2000] * 2000;
                }
                if (elem[1000] !== undefined) {
                    BankNotesRepository[1000] +=elem[1000];
                    addSumClient += elem[1000] * 1000;
                }
                if (elem[500] !== undefined) {
                    BankNotesRepository[500] +=elem[500];
                    addSumClient += elem[500] * 500;
                }
                if (elem[200] !== undefined) {
                    BankNotesRepository[200] +=elem[200];
                    addSumClient += elem[200] * 200;
                }
                if (elem[100] !== undefined) {
                    BankNotesRepository[100] +=elem[100];
                    addSumClient += elem[100] * 100;
                }
                if (elem[50] !== undefined) {
                    BankNotesRepository[50] +=elem[50];
                    addSumClient += elem[50] * 50;
                }
                if (elem[10] !== undefined) {
                    BankNotesRepository[10] +=elem[10];
                    addSumClient += elem[10] * 10;
                }
            });
            
            activClient.balance += addSumClient;
        
        },

        giveMoney: (money: number) => {
            
            if (activClient.balance < money) {
                throw new Error('На вашем счету недостаточно средств.');
            }
            
            if (money % 10 !==0) {
                throw new Error('Сумма выдачи должна быть кратна 10.');
            }
            
            let objMoney: INotesRepos = {};
            let giveMoney = money;
            if (activClient.balance >= money && (money % 10 === 0)) {
                let sum5000 = 0;
                let sum2000 = 0;
                let sum1000 = 0;
                let sum500 = 0;
                let sum200 = 0;
                let sum100 = 0;
                let sum50 = 0;
                let sum10 = 0;
                while (giveMoney >= 9) {
                    if (giveMoney >= 5000 && BankNotesRepository[5000] !== 0) {
                        giveMoney -= 5000;
                        BankNotesRepository[5000] -= 1;
                        sum5000++
                        objMoney['5000'] = sum5000;
                        continue
                    }
                    if (giveMoney >= 2000 && BankNotesRepository[2000] !== 0) {
                        giveMoney -= 2000;
                        BankNotesRepository[2000] -= 1;
                        sum2000++
                        objMoney['2000'] = sum2000;
                        continue
                    }
                    if (giveMoney >= 1000 && BankNotesRepository[1000] !== 0) {
                        giveMoney -= 1000;
                        BankNotesRepository[1000] -= 1;
                        sum1000++
                        objMoney['1000'] = sum1000;
                        continue
                    }
                    if (giveMoney >= 500 && BankNotesRepository[500] !== 0) {
                        giveMoney -= 500;
                        BankNotesRepository[500] -= 1;
                        sum500++
                        objMoney['500'] = sum500;
                        continue
                    }
                    if (giveMoney >= 200 && BankNotesRepository[200] !== 0) {
                        giveMoney -= 200;
                        BankNotesRepository[200] -= 1;
                        sum200++
                        objMoney['200'] = sum200;
                        continue
                    }
                    if (giveMoney >= 100 && BankNotesRepository[100] !== 0) {
                        giveMoney -= 100;
                        BankNotesRepository[100] -= 1;
                        sum100++
                        objMoney['100'] = sum100;
                        continue
                    }
                    if (giveMoney >= 50 && BankNotesRepository[50] !== 0) {
                        giveMoney -= 50;
                        BankNotesRepository[50] -= 1;
                        sum50++
                        objMoney['50'] = sum50;
                        continue
                    }
                    if (giveMoney >=10 && BankNotesRepository[10] !== 0) {
                        giveMoney -= 10;
                        BankNotesRepository[10] -= 1;
                        sum10++
                        objMoney['10'] = sum10;
                        continue
                    }
                    if (giveMoney > 0) {
                        throw new Error('В банкомате недостаточно купюр')
                    }
                }
            }

            if (giveMoney === 0) {
                activClient.balance -= money;
                console.log(objMoney)
                return objMoney
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