import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-6 border border-gray-700 rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
              Login
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-2" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 text-white placeholder-gray-500 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-2" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-white placeholder-gray-500 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button className="relative z-10 w-full text-white transition-all duration-150 bg-gray-900 hover:bg-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:scale-[0.97]" type="submit" disabled={isLoading}>
              <span className="flex items-center justify-center">
                Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </Button>
            <p className="text-sm text-center text-white">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 transition-colors hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
          <div>
            {error && <div className="text-sm text-red-500">{error}</div>}
          </div>
        </form>
      </motion.div>
    </div>
  );
}