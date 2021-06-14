import { TestBed } from '@angular/core/testing';

import { WidgetEmitterService } from './widget-emitter.service';

describe('WidgetEmitterService', () => {
  let service: WidgetEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
