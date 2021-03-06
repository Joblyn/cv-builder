import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";

import * as ROUTES from "./constants/routes";
import { Loading } from "./components/loading";
import { useAuthListener } from "./hooks";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import Resume from './pages/resume';
// import { Parent } from './containers';
import { ResumeDoc } from './components';

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const SignUp = lazy(() => import("./pages/signup"));
const SignIn = lazy(() => import("./pages/signin"));

const PersonalInfo = lazy(() => import("./containers/personal-Info"));
const Education = lazy(() => import("./containers/education"));
const WorkExperience = lazy(() => import("./containers/work-experience"));
const Languages = lazy(() => import("./containers/languages"));
const Certifications = lazy(() => import("./containers/certifications"));
const Achievements = lazy(() => import("./containers/achievements"));
const Skills = lazy(() => import("./containers/skills"));
const Reference = lazy(() => import("./containers/reference"));

export default function App() {
  const { user } = useAuthListener();
  
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          {/* <Parent> */}
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={ROUTES.ABOUT} component={About}/>
            <Route exact path={ROUTES.CONTACT} component={Contact}/>
            <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
            <IsUserRedirect
              user={user}
              loggedInPath={ROUTES.PERS_INFO}
              path={ROUTES.SIGN_IN}
            >
              <SignIn />
            </IsUserRedirect>
          {/* </Parent> */}

          <Resume>
            <ProtectedRoute exact user={user} path={ROUTES.PERS_INFO} component={PersonalInfo} />
            <ProtectedRoute exact user={user} path={ROUTES.EDU} component={Education} />
            <ProtectedRoute exact user={user} path={ROUTES.WORK_EXP} component={WorkExperience} />
            <ProtectedRoute exact user={user} path={ROUTES.LANG} component={Languages} />
            <ProtectedRoute exact user={user} path={ROUTES.CERT} component={Certifications} />
            <ProtectedRoute exact user={user} path={ROUTES.ACHIEVE} component={Achievements} />
            <ProtectedRoute exact user={user} path={ROUTES.SKILLS} component={Skills} />
            <ProtectedRoute exact user={user} path={ROUTES.REF} component={Reference} />
            <ProtectedRoute exact user={user} path={ROUTES.PREVIEW_RESUME} component={ResumeDoc}/>
          </Resume>
        </Switch>
      </Suspense>
    </Router>
  );
}
