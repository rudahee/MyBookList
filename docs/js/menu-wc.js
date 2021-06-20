'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-book-list documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-7061b6125b1ca142bc2bff23956bd183"' : 'data-target="#xs-components-links-module-AdminModule-7061b6125b1ca142bc2bff23956bd183"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-7061b6125b1ca142bc2bff23956bd183"' :
                                            'id="xs-components-links-module-AdminModule-7061b6125b1ca142bc2bff23956bd183"' }>
                                            <li class="link">
                                                <a href="components/AddPendingBookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddPendingBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateSpecialAccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateSpecialAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPendingBooksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListPendingBooksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatisticsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ece390dcd4c477112481c8eaad14a50b"' : 'data-target="#xs-components-links-module-AppModule-ece390dcd4c477112481c8eaad14a50b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ece390dcd4c477112481c8eaad14a50b"' :
                                            'id="xs-components-links-module-AppModule-ece390dcd4c477112481c8eaad14a50b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorModule.html" data-type="entity-link">AuthorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthorModule-04f2709a9a916f9f67f5bd2f918d2472"' : 'data-target="#xs-components-links-module-AuthorModule-04f2709a9a916f9f67f5bd2f918d2472"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthorModule-04f2709a9a916f9f67f5bd2f918d2472"' :
                                            'id="xs-components-links-module-AuthorModule-04f2709a9a916f9f67f5bd2f918d2472"' }>
                                            <li class="link">
                                                <a href="components/AuthorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthorHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthorHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SetPersonalDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SetPersonalDataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthorRoutingModule.html" data-type="entity-link">AuthorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrivateModule.html" data-type="entity-link">PrivateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivateModule-5e9f62d0bbd45b15235c84449d89f85a"' : 'data-target="#xs-components-links-module-PrivateModule-5e9f62d0bbd45b15235c84449d89f85a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivateModule-5e9f62d0bbd45b15235c84449d89f85a"' :
                                            'id="xs-components-links-module-PrivateModule-5e9f62d0bbd45b15235c84449d89f85a"' }>
                                            <li class="link">
                                                <a href="components/AddBookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddMultipleBooksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddMultipleBooksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddSagaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddSagaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SagaListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SagaListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivateRoutingModule.html" data-type="entity-link">PrivateRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link">PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublicModule-bc75811debe6aa8e6ac865cc4289acb7"' : 'data-target="#xs-components-links-module-PublicModule-bc75811debe6aa8e6ac865cc4289acb7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-bc75811debe6aa8e6ac865cc4289acb7"' :
                                            'id="xs-components-links-module-PublicModule-bc75811debe6aa8e6ac865cc4289acb7"' }>
                                            <li class="link">
                                                <a href="components/ActivateAccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActivateAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinishSignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FinishSignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicAuthorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicAuthorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserBookListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserBookListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link">PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-03aa7159c7edc2200ece7742f27986af"' : 'data-target="#xs-components-links-module-UserModule-03aa7159c7edc2200ece7742f27986af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-03aa7159c7edc2200ece7742f27986af"' :
                                            'id="xs-components-links-module-UserModule-03aa7159c7edc2200ece7742f27986af"' }>
                                            <li class="link">
                                                <a href="components/AddBookPendingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddBookPendingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddBookToListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddBookToListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangeBookStatusComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangeBookStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link">UserRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsModule.html" data-type="entity-link">WidgetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WidgetsModule-b1111c960f1d2ebf0c73fc80945ced69"' : 'data-target="#xs-components-links-module-WidgetsModule-b1111c960f1d2ebf0c73fc80945ced69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WidgetsModule-b1111c960f1d2ebf0c73fc80945ced69"' :
                                            'id="xs-components-links-module-WidgetsModule-b1111c960f1d2ebf0c73fc80945ced69"' }>
                                            <li class="link">
                                                <a href="components/SearchAuthorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchAuthorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectAuthorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectAuthorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectGenreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectGenreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectSagaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectSagaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableBookListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableBookListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/StatisticsComponent-1.html" data-type="entity-link">StatisticsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/userComponent.html" data-type="entity-link">userComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BookService.html" data-type="entity-link">BookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtHandlerService.html" data-type="entity-link">JwtHandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatisticsService.html" data-type="entity-link">StatisticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WidgetEmitterService.html" data-type="entity-link">WidgetEmitterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpInterceptorService.html" data-type="entity-link">HttpInterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/IsAdminGuard.html" data-type="entity-link">IsAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsAuthorGuard.html" data-type="entity-link">IsAuthorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsLoggedGuard.html" data-type="entity-link">IsLoggedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsUserGuard.html" data-type="entity-link">IsUserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IActivateAccount.html" data-type="entity-link">IActivateAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthorSimple.html" data-type="entity-link">IAuthorSimple</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBook.html" data-type="entity-link">IBook</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookForApproval.html" data-type="entity-link">IBookForApproval</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookForRecommendation.html" data-type="entity-link">IBookForRecommendation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBookToPublicList.html" data-type="entity-link">IBookToPublicList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComment.html" data-type="entity-link">IComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFriendRequest.html" data-type="entity-link">IFriendRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGenre.html" data-type="entity-link">IGenre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwt.html" data-type="entity-link">IJwt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginData.html" data-type="entity-link">ILoginData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPublicAuthor.html" data-type="entity-link">IPublicAuthor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecommendation.html" data-type="entity-link">IRecommendation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISaga.html" data-type="entity-link">ISaga</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStatisticsAdmin.html" data-type="entity-link">IStatisticsAdmin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStatisticsAuthor.html" data-type="entity-link">IStatisticsAuthor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStatisticsUser.html" data-type="entity-link">IStatisticsUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});