'use strict';

class Profile {

	constructor({ username, name: {firstName, lastName}, password}) {

		this.username = username;
		this.name = {firstName, lastName};
		this.password = password;
	}

	addUser(callback) {
        
		let username = this.username;
		let firstName = this.name.firstName;
		let lastName = this.name.lastName;
		let password = this.password;

        return ApiConnector.createUser({ username, name: { firstName, lastName }, password}, (err, data) => {
			callback(err, data);
		});
	};

	authorization(callback) {

		let username = this.username;
        let password = this.password;
        
		return ApiConnector.performLogin({ username, password }, (err, data) => {
			callback(err, data);
		})
	};

	addMoney({ currency, amount }, callback) {
		return ApiConnector.addMoney({ currency, amount }, (err, data) => {
			callback(err, data);
		});
	};

	convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
		return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
			console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
			callback(err, data);
		});
	};

	transferMoney({ to, amount }, callback) {
		return ApiConnector.transferMoney({ to, amount }, (err, data) => {
			callback(err, data);
		});
	};
};

function getStocks(callback) {
	return ApiConnector.getStocks((err, data) => {
	  	console.log('Got stocks info');
		callback (err, data);
	});
};

function main() {
	const Ivan = new Profile({username: 'ivan', name: { firstName: 'Ivan', lastName: 'Chernyshev' }, password: 'ivanspass',});
	const Alex = new Profile({username: 'alex', name: { firstName: 'Alex', lastName: 'Miller' }, password: 'ivan-durak',});
	
	let stocksInfo;
	getStocks((err, data) => {
		if (err) {
			console.log(`Error, can't getting stocks`);
		} else {
			stocksInfo = data[0];
			console.log(stocksInfo); //нужен чтобы смотреть какой курс берется
		}
	});	

	Ivan.addUser((err, data) => {
		if(err) {
			console.log(`Error, can't create user Ivan`);
		} else {
			console.log(`Ivan is created`);
			Ivan.authorization((err, data) => {
				if(err) {
					console.log(`Error, can't authorize Ivan`);
				} else {
					console.log(`Ivan is authorized`);
					Ivan.addMoney({currency: 'EUR', amount: 50}, (err, data) => {
						if (err) {
							console.log(`Error, can't add money to Ivan's wallet`);
						} else {
							console.log(`Added 500 Euro to Ivan`);
							const targetAmount = Number(stocksInfo.EUR_NETCOIN) * 50;
							console.log(targetAmount); // проверяю какая сумма неткоинов получается
							Ivan.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: targetAmount}, (err, data) => {
								if(err) {
									console.error(`Error, can't convert`);
									console.log(targetAmount);
								} else {
									console.log(`Converted to coins:`, data);
									Alex.addUser((err, data) => {
										if(err) {
											console.log(`Error, can't create user Alex`);
										} else {
											Ivan.transferMoney({to: 'alex', amount: targetAmount}, (err, data) => {
												if(err) {
													console.log(`Error, can't transfer money`);
												} else {
														console.log(`Alex now has ${targetAmount} of NETCOINS`);
												};
											});
										};
									});
								};
							});
						};
					});
				};
			});
		};
	});
};

main();