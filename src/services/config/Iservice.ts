export interface IService {
	fetchFile(url: string): Promise<any>;
	fetchData(url: string): Promise<any>;
	postData(url: string, data: any): Promise<any>;
	patchData(url: string, data: any): Promise<any>;
	deleteData(url: string): Promise<any>;
	putData(url: string, data: any): Promise<any>;
}
