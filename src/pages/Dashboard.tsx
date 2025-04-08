
import Header from "@/components/Header";
import EmailSidebar from "@/components/EmailSidebar";
import EmailList from "@/components/EmailList";
import EmailView from "@/components/EmailView";
import ComposeEmail from "@/components/ComposeEmail";
import { useEmail } from "@/contexts/EmailContext";

const Dashboard = () => {
  const { selectedEmail } = useEmail();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar />
        <div className="flex flex-1 overflow-hidden">
          {!selectedEmail ? (
            <EmailList />
          ) : (
            <>
              <div className="hidden md:block md:w-1/3 lg:w-1/3">
                <EmailList />
              </div>
              <EmailView />
            </>
          )}
        </div>
      </div>
      <ComposeEmail />
    </div>
  );
};

export default Dashboard;
