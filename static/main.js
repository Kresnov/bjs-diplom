'use strict'

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
			console.log(`Creating user ${username}`);
			callback(err, data);
		});
	};

	authorization(callback) {

		let username = this.username;
        let password = this.password;
        
		return ApiConnector.performLogin({ username, password }, (err, data) => {
			console.log(`Authorization of user ${this.username}`);
			callback(err, data);
		})
	};

	addMoney({ currency, amount }, callback) {
		return ApiConnector.addMoney({ currency, amount }, (err, data) => {
			console.log(`Adding ${amount} of ${currency} to ${this.username}`);
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
			console.log(`Transfering Netcoins ${amount} to ${to}`);
			callback(err, data);
		});
	};
};

function getStocks(callback) {
	return ApiConnector.getStocks((err, data) => {
	  	console.log('Getting stocks info');
		callback (err, data);
	});
};