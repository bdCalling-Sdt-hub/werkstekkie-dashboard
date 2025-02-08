import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import AdminRoutes from "./AdminRoutes";
import OverviewPage from "../page/Overview/OverviewPage";
import AllCandidatePage from "../page/AllCandidate/AllCandidatePage";
import ShortlistPage from "../page/Shortlist/ShortlistPage";
import Shortlist from "../component/Main/Shortlist/Shortlist";
import AlljobPage from "../page/Alljobs/AlljobPage";
import JobEiditeForm from "../component/Main/jobEiditing/JobEiditing";
import JobEiditePage from "../page/JobEidite/JobEiditePage";
import JobPostingForm from "../component/Main/JobPost/JobPost";
import BlogPostPage from "../page/BlogPost/BlogPostPage";
import BlogEiditePage from "../page/BlogEidite/BlogEiditePage";
import ProfileSettings from "../component/Main/ProfileSetting/ProfileSetting";
import CreateBlogPage from "../page/CreateBlog/CreateBlogPage";
import FaqPage from './../page/Faq/FaqPage';
import FaqEdidtePage from './../page/FaqEidite/FaqEditePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes >
        <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path:"allcandidate",
        element: <AllCandidatePage  />,
        // children: [
        //   {
        //     path: "shortlist",
        //     element: <ShortlistPage />,
        //   },
        // ]
      },
      {
        path:"shortlist",
        element: <Shortlist  />,
         
      },
      {
        path:"alljob",
        element: <AlljobPage  />,
         
      },
      {
        path:"jobEidite/:id",
        element: <JobEiditePage  />,
         
      },
      {
        path:"jobPost",
        element: <JobPostingForm  />,
         
      },
      {
        path:"blog",
        element: <BlogPostPage  />,
         
      },
      {
        path:"blog/:id",
        element: <BlogEiditePage  />,
         
      },
      {
        path:"newblog",
        element: <CreateBlogPage  />,
         
      },
      {
        path:"faq",
        element: <FaqPage  />,
      },
      {
        path:"faq/:id",
        element: <FaqEdidtePage />, 
      },
      {
        path:"setting",
        element: <ProfileSettings  />,
         
      },
      
      
      
      ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
