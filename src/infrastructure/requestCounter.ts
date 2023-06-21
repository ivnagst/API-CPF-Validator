import { injectable } from 'inversify';

@injectable()
export class RequestCounter {
	private count = 0;

	public increment(): void {
		this.count++;
	}

	public getCount(): number {
		return this.count;
	}
}

export default RequestCounter;
