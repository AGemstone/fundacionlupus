import { TestBed } from "@angular/core/testing";

import { BackendProviderService } from "./backend-provider.service";

describe("BackendProviderService", () => {
  let service: BackendProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
