import PageHeader from "../components/page-header";
import Trend from "../components/Trend";
import TransactionItem from "../components/transaction-item";
import TransactionSummaryItem from "../components/transaction-summary-item";
import Button from "../components/button";
import Label from "../components/Label";
import Input from "../components/Input";
import Select from "../components/Select";
import Seperator from "../components/seperator";
import Skeleton from "../components/skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
};
const Page = () => {
  return (
    <main className="space-y-8 mb-44">
      <h1 className="text-4xl mt-8 ">Playground</h1>
      <div>
        <h2 className="mb-4 font-mono text-lg">PageHeader</h2>
        <Seperator />
        <div>
          <PageHeader className="my-8" />
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-lg">Trend</h2>
        <Seperator />
        <div className="flex space-x-8">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expenses" amount={12000} prevAmount={10000} />
          <Trend type="Investment" amount={7000} prevAmount={11100} />
          <Trend type="Savings" amount={500} prevAmount={950} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-lg">Transaction Item</h2>
        <hr className=" border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem
            type="Expenses"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Savings"
            description="For children"
            amount={500}
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-lg">
          Transaction-summary-item + Transaction Item
        </h2>
        <Seperator />
        <div className="space-y-4">
          <TransactionSummaryItem date="2024-05-01" amount={3500} />
          <Seperator />
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem
            type="Expenses"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Savings"
            description="For children"
            amount={500}
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-lg">Buttons</h2>
        <Seperator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>
          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-mono text-lg">Forms</h2>
        <Seperator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Your Name</Label>

            <Input type="text" placeholder="Type something in here" />
          </div>
          <div>
            <Label className="mb-1">City</Label>
            <Select className="">
              <option value="">Warseum</option>
              <option value="">London</option>
              <option value="">Berlin</option>
            </Select>
          </div>
          <div className="flex items-center">
            <Input id="terms" type="checkbox" />
            <Label className="ml-2" htmlFor="terms">
              Accept Terms
            </Label>
            {/* for attribute which is linked with the id of the input so that whenever the label is clicked, it checks the checkbox, since label here is a component we can use for attribute here instead we use htmlFor */}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-mono text-lg">Loading Skeleton</h2>
        <Seperator />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
