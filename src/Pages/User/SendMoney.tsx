import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SendMoney = () => {
  return (
    <div className="flex-1 lg:w-5xl flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Send Money</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className=" text-base">
            Search user by email and transfer money safely.
          </p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient Email</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="Enter email"
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="mt-1 w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;
