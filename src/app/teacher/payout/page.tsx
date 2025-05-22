"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@mui/material";
import { CardTitle } from "@/components/ui/cardTitle";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Toast } from "@/components/ui/toast";
import { BASE_URL_PAYMENT_SERVICE, BASE_URL_USER_SERVICE } from "@/utils/BaseURL";

interface PayoutRequest {
  paypalEmail: string;
  amount: number;
}

interface PayoutHistoryItem {
  id: string;
  amount: number;
  status: string;
  requestedAt: string;
}

export default function TeacherPayoutPage() {
  const [balance, setBalance] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [history, setHistory] = useState<PayoutHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // fetch teacher info
    axios.get(BASE_URL_USER_SERVICE + "/own", {
      withCredentials: true, headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    }).then(res => {
      setBalance(res.data.user.balance || 0);
      setEmail(res.data.user.email || "");
    });
    // fetch payout history
    axios.get(BASE_URL_PAYMENT_SERVICE + "/teacher/require-payout", {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    })
      .then(res => {
        const raw: any[] = res.data.data || [];
        const mapped: PayoutHistoryItem[] = raw.map(item => ({
          id: item.id,
          amount: item.amount,
          status: item.transactionStatus || item.status || "",
          requestedAt: item.createdAt,
        }));
        setHistory(mapped);
      });
  }, []);

  const submitRequest = async () => {
    if (!email || amount <= 0 || amount > balance) {
      setToast("Invalid email or amount");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        BASE_URL_PAYMENT_SERVICE + "/teacher/require-payout",
        { emailPaypal: email, amount },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("access_token"),

          }
        }
      );
      await reload()

      setToast("Payout request sent");

    } catch (err) {
      setToast("Request failed");
    } finally {
      setLoading(false);
    }
  };
  const reload = async () => {
    // refresh profile and history
    axios.get(BASE_URL_USER_SERVICE + "/own", {
      withCredentials: true, headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    }).then(res => {
      setBalance(res.data.user.balance || 0);
      setEmail(res.data.user.email || "");
    });
    axios.get(BASE_URL_PAYMENT_SERVICE + "/teacher/require-payout", {
      withCredentials: true, headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),

      }
    })
      .then(res => {
        const raw: any[] = res.data.data || [];
        const mapped: PayoutHistoryItem[] = raw.map(item => ({
          id: item.id,
          amount: item.amount,
          status: item.transactionStatus || item.status || "",
          requestedAt: item.createdAt,
        }));
        setHistory(mapped);
      });
  }
  const handleCancelRequire = async (requireId: string) => {
    await axios.get(
      BASE_URL_PAYMENT_SERVICE + "/teacher/cancel-require-payout?requireId=" + requireId,
      {
        withCredentials: true, headers: {
          Authorization: "Bearer " + window.localStorage.getItem("access_token"),

        }
      }
    );
    await reload();

  }
  return (
    <div className="p-8 mx-auto w-full flex-1 p-6 h-screen overflow-y-auto no-scrollbar">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="balance">Current Balance</Label>
            <div id="balance" className="mt-1 text-xl font-semibold">
              ${balance.toFixed(2)}
            </div>
          </div>
          <div>
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount to Withdraw</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={e => setAmount(parseFloat(e.target.value))}
              placeholder="0.00"
            />
          </div>
          <Button onClick={submitRequest} disabled={loading} className="w-full">
            {loading ? "Sending..." : "Request Payout"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="py-2">
                    {new Date(item.requestedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}{' '}
                    {new Date(item.requestedAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-2">${item.amount.toFixed(2)}</td>
                  <td className="py-2 capitalize">{item.status.toLowerCase()}</td>
                  <td>
                    {item.status === 'UNCLAIMED' ?
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelRequire(item.id)}
                      >
                        Cancel
                      </Button>
                      :
                      <></>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {toast && (
        <Toast onOpenChange={() => setToast(null)}>{toast}</Toast>
      )}
    </div>
  );
}
