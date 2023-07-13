import { injectable } from 'inversify';

@injectable()
class RequestCounter {
	private count = 0;

	public increment(): void {
		this.count++;
	}

	public getCount(): number {
		return this.count;
	}
}

export default RequestCounter;
