import {injectable} from "inversify";

@injectable()
export class PingFinderTest{

    private regexp = "ping";

    public isPing = (query: string) => {
        return query.search(this.regexp) >= 0;
    }
}