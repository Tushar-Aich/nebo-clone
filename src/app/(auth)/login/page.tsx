"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginSchema } from '@/Schemas/login'
import { IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleRegister = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })
      if(result?.url) router.push('/library');
    } catch (error: any) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const logo_url = process.env.LOGO_URL!;

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Card className='flex flex-col items-center px-5 py-8 overflow-hidden'>
            <CardTitle className='flex items-center gap-4'>
                <Image 
                  src="/Scriblio.png"
                  height={64}
                  width={64}
                  alt='logo'
                  className='rounded-lg'
                />
                <h1 className='text-5xl font-bold font-serif'>Scriblio</h1>
            </CardTitle>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-6 flex flex-col items-center'>
                        <FormField 
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="example@example.com" {...field} className='w-80' autoComplete='email'/>
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
                        {loading ? (
                          <Button className='px-5 py-2 text-white dark:text-black font-bold flex items-center' disabled>
                            <Loader2 className='animate-spin'/>
                            Loading...
                          </Button>
                        ): (
                          <Button type='submit' className='px-5 py-2 text-white dark:text-black font-bold'>Submit</Button>
                        )}
                    </form>
                </Form>
                <CardDescription className='flex items-center gap-2 text-sm mt-2 text-muted-foreground'>Don't have an account? <Link href='/register' className='underline'>Sign up</Link></CardDescription>
                <CardFooter className='flex items-center gap-2 mt-4 w-full justify-between'>
                      <Button
                        className='flex gap-2 items-center'
                        onClick={() => signIn('google')}
                      >
                        <IconBrandGoogleFilled />
                        <h1>Google</h1>
                      </Button>
                      <Button
                        className='flex gap-2 items-center'
                        onClick={() => signIn('github')}
                      >
                        <IconBrandGithubFilled />
                        <h1>Github</h1>
                      </Button>
                </CardFooter>
            </CardContent>
        </Card>
    </div>
  )
}

export default Register