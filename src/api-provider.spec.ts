import { RegisteredChainName } from "./configs";
import { ApiProvider } from "./api-provider";
import { firstValueFrom } from "rxjs";

describe("api-provider", () => {
  jest.setTimeout(30000);

  const provider = new ApiProvider();

  test("connectFromChain should be ok", async () => {
    const chains: RegisteredChainName[] = ["kusama", "karura", "polkadot", "acala"];

    expect(provider.getApi(chains[0])).toEqual(undefined);
    expect(provider.getApi(chains[1])).toEqual(undefined);

    const res = await firstValueFrom(provider.connectFromChain(chains, undefined));

    expect(res.length).toEqual(chains.length);

    expect(res[0]).toEqual(chains[0]);
    expect(res[1]).toEqual(chains[1]);
    expect(res[2]).toEqual(chains[2]);
    expect(res[3]).toEqual(chains[3]);

    expect(provider.getApi(chains[0])).toBeDefined();
    expect(provider.getApi(chains[1])).toBeDefined();

    expect((await firstValueFrom(provider.getApi(chains[2]).rpc.system.chain())).toLowerCase()).toEqual(chains[2]);
    expect((await firstValueFrom(provider.getApi(chains[3]).rpc.system.chain())).toLowerCase()).toEqual(chains[3]);

    expect((await provider.getApiPromise(chains[0]).rpc.system.chain()).toLowerCase()).toEqual(chains[0]);
    expect((await provider.getApiPromise(chains[1]).rpc.system.chain()).toLowerCase()).toEqual(chains[1]);
  });
});
