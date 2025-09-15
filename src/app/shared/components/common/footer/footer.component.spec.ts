import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Sign in button with correct text', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Sign in for more access');
  });

  it('should render "Follow IdMB on social" heading', () => {
    const heading = fixture.debugElement.query(By.css('h6')).nativeElement;
    expect(heading.textContent).toContain('Follow IdMB on social');
  });

  it('should render 5 social media icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('i.bi'));
    expect(icons.length).toBe(5);
  });

  it('should include footer links like Help and Site Index', () => {
    const links = fixture.debugElement.queryAll(By.css('.small a'));
    const linkTexts = links.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Help');
    expect(linkTexts).toContain('Site Index');
    expect(linkTexts).toContain('Box Office Mojo');
    expect(linkTexts).toContain('License IdMB Data');
  });

  it('should display Amazon branding', () => {
    const branding = fixture.debugElement.query(By.css('footer')).nativeElement.textContent;
    expect(branding).toContain('an amazon company');
  });

  it('should display copyright notice for 2025', () => {
    const footerText = fixture.debugElement.query(By.css('footer')).nativeElement.textContent;
    expect(footerText).toContain('© 2025 by IdMB.com, Inc.');
  });
});
