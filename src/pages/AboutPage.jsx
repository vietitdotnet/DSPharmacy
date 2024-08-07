import { Component } from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default class AboutPage extends Component {
  render() {
    return (
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4'>
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
            </form>
      </div>
    )
  }
}
