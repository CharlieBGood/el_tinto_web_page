import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from '../../components/organisms/Welcome';
import Header from '../../components/organisms/Header';
import { FlexContainer } from '../../components/atoms';
import Footer from "../../components/organisms/Footer";
import Suscribe from "../../components/organisms/Suscribe";
import Faqs from "../../components/organisms/Faqs";
import NotFound from "../../components/organisms/NotFound";
import TodaysTinto from "../../components/organisms/TodaysTinto";
import SuscribeConfirm from "../../components/organisms/SuscribeConfirm";
import ChangeDays from "../../components/organisms/ChangeDays";
import ChangeDaysConfirm from "../../components/organisms/ChangeDaysConfirm";
import Unsuscribe from "../../components/organisms/Unsuscribe";
import ReferralHub from "../../components/organisms/ReferralHub";
import TodaysTintoRedirect from "../../components/organisms/TodaysTintoRedirect";
import News from "../../components/organisms/News";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/suscribirse",
    element: <Suscribe />
  },
  {
    path: "/suscripcion-confirmada",
    element: <SuscribeConfirm />
  },
  {
    path: "/faq",
    element: <Faqs />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: 'el-tinto-de-hoy',
    element: <TodaysTinto />
  },
  {
    path: 'el-tinto-de-hoy',
    element: <TodaysTinto />
  },
  {
    path: 'el-tinto',
    element: <TodaysTintoRedirect />
  },
  {
    path: 'el_tinto',
    element: <TodaysTintoRedirect />
  },
  {
    path: 'noticias/:id',
    element: <News />
  },
  {
    path: 'desuscribirse/personalizar',
    element: <ChangeDays />
  },
  {
    path: 'desuscribirse/personalizar/confirmacion',
    element: <ChangeDaysConfirm />
  },
  {
    path: 'desuscribirse/adios',
    element: <Unsuscribe />
  },
  {
    path: 'referidos',
    element: <ReferralHub />
  }
])

const ElTinto = () => {

  return(
    <>
      <Header />
      <FlexContainer margin="0 auto" direction="column" style={{minHeight: '75vh'}}>
        <RouterProvider router={router} />
      </FlexContainer>
      <Footer />
    </>
  )
}

export default ElTinto;