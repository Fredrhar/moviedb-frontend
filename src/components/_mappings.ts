import {
 CATCH_ALL,
 ComponentRegistry,
} from '@enonic/nextjs-adapter/ComponentRegistry';
import { APP_NAME } from '@enonic/nextjs-adapter';
import { commonQuery, commonVariables } from './queries/common';
import { getPerson } from './queries/getPerson';
import PropsView from './views/Props';
import Person from './views/Person';
import MainPage from './pages/Main';
import ChildList from './parts/ChildList';
import { childListProcessor, getChildList } from './queries/getChildList';
import Heading from './parts/Heading';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import MovieDetails from './parts/MovieDetails';
import { getMovie } from './queries/getMovie';

// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
 query: getPerson,
 view: Person,
});

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
 view: MainPage,
});

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
 view: TwoColumnLayout,
});

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
 query: getChildList,
 processor: childListProcessor,
 view: ChildList,
});
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
 view: Heading,
});
ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
 query: getMovie,
 view: MovieDetails,
});

/* // Debug
ComponentRegistry.addContentType(CATCH_ALL, {
 view: PropsView,
}); */
