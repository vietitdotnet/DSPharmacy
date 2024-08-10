import { Component } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default class AboutPage extends Component {
  render() {
    return (
      <div className="flex flex-wrap items-center justify-center max-w-screen-xl p-4">
        <div className="w-full h-full mx-auto">
        <form className="flex flex-col max-w-md gap-4 mx-auto">
          <div>
            <div className="block mb-2">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" className="cursor-pointer" />
            <Label htmlFor="remember" className="cursor-pointer select-none">Remember me</Label>
          </div>
          <Button type="submit" className="bg-blue-500">Submit</Button>
        </form>
        </div>
      </div>
    );
  }
}
