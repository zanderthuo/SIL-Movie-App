import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideMockStore({
          initialState: {
            searchResults: { movies: [], loading: false, error: null } // 👈 adjust to your feature state shape
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand logo with text "IdMB"', () => {
    const brand = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
    expect(brand.textContent.trim()).toBe('IdMB');
  });

  it('should have a search input with placeholder "Search IdMB"', () => {
    const searchInput = fixture.debugElement.query(By.css('input[type="search"]')).nativeElement;
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute('placeholder')).toBe('Search IdMB');
  });

  it('should render a dropdown with options Movies, TV Shows, and Celebrities', () => {
    const dropdownItems = fixture.debugElement.queryAll(By.css('.dropdown-menu .dropdown-item'));
    const texts = dropdownItems.map(el => el.nativeElement.textContent.trim());
    expect(texts).toContain('Movies');
    expect(texts).toContain('TV Shows');
    expect(texts).toContain('Celebrities');
  });

  it('should have a search button with a search icon', () => {
    const searchButton = fixture.debugElement.query(By.css('button[type="submit"] i.bi-search'));
    expect(searchButton).toBeTruthy();
  });

  it('should have navigation links for Watchlist and Sign in', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.navbar-nav .nav-link'));
    const linkTexts = navLinks.map(el => el.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Watchlist');
    expect(linkTexts).toContain('Sign in');
  });

  it('should render a navbar toggler button for mobile', () => {
    const toggler = fixture.debugElement.query(By.css('.navbar-toggler'));
    expect(toggler).toBeTruthy();
  });
});
