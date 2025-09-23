"use client"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RegisterSchema } from '@/Schemas/register'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: ""
    }
  });

  const handleRegister = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/register', values, {headers: {'Content-Type': 'application/json'}})
      if(response.data.success) router.replace('/login')
    } catch (error) {
      console.error("Error in registering user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Card className='flex flex-col items-center px-5 py-8'>
            <CardTitle className='flex items-center gap-4'>
                <img src="Scriblio.png" alt="" className='h-16 w-16 rounded-lg'/>
                <h1 className='text-5xl font-bold font-serif'>Scriblio</h1>
            </CardTitle>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-6 flex flex-col items-center'>
                        <FormField 
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='example106' {...field} className='w-80'/>
                                    </FormControl>
                                    <FormDescription>This is your unique identifier.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                          control={form.control}
                          name="name"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Example example" {...field} className='w-80'/>
                              </FormControl>
                              <FormDescription>How you wnat to be addressed</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField 
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="example@example.com" {...field} className='w-80'/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField 
                          control={form.control}
                          name="password"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input placeholder="********" type="password" {...field} className='w-80'/>
                              </FormControl>
                              <FormDescription>Password must be minimum 8 characters long</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type='submit' className='px-5 py-2 text-white dark:text-black font-bold'>Submit</Button>
                    </form>
                </Form>
                <CardFooter className='flex items-center gap-2 text-sm mt-2 text-muted-foreground'>Already have an account? <Link href='/login' className='underline'>Sign in</Link></CardFooter>
            </CardContent>
        </Card>
    </div>
  )
}

export default Register