import { json } from 'd3-fetch';
import { IService } from './Iservice';

export class FetchService implements IService {
     token:string
	constructor(token){
		this.token = token
	}

	async fetchData(url: string): Promise<any> {
		try {
			const response = await fetch(url,{
				method:'GET',
				headers: this.defaultHeader(),
			});
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			return await response.json();
		} catch (error) {
			throw new Error(`Failed to fetch data: ${error.message}`);
		}
	}

	async postData(url: string, data: any): Promise<any> {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: this.defaultHeader(),
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const { message } = await response.json();
				throw new Error(message);
			}
			return await response.json();
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async patchData(url: string, data: any): Promise<any> {
		try {
			const response = await fetch(url, {
				method: 'PATCH',
				headers: this.defaultHeader(),
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error('Failed to patch data');
			}
			return await response.json();
		} catch (error) {
			throw new Error(`Failed to patch data: ${error.message}`);
		}
	}

	async deleteData(url: string): Promise<any> {
		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: this.defaultHeader(),
			});
			if (!response.ok) {
				throw new Error('Failed to delete data');
			}
			return await response.json();
		} catch (error) {
			throw new Error(`Failed to delete data: ${error.message}`);
		}
	}

	async putData(url: string, data: any): Promise<any> {
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error('Failed to put data');
			}
			return await response.json();
		} catch (error) {
			throw new Error(`Failed to put data: ${error.message}`);
		}
	}

	private defaultHeader() {
		return {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.token}`
			}
	}
}
