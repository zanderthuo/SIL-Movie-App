import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';  // 👈 import mock store
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        provideMockStore({ initialState: {} })  // 👈 add this
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the layout component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the app-header component', () => {
    const header = fixture.debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
  });

  it('should contain a router-outlet inside main', () => {
    const outlet = fixture.debugElement.query(By.css('main router-outlet'));
    expect(outlet).toBeTruthy();
  });

  it('should contain the app-footer component', () => {
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
  });

  it('should have main container with class flex-grow-1', () => {
    const main = fixture.debugElement.query(By.css('main'));
    expect(main).toBeTruthy();
    expect(main.nativeElement.classList).toContain('flex-grow-1');
  });
});
