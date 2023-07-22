import { Redirect } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { React, useEffect, useState } from 'react';

export default function IndexPage() {
  const { user } = useAuth();
  const [redirectRoute, setRedirectRoute] = useState('');

  async function fetchUsername() {
    let { data, error } = await supabase.from('profiles').select('username').eq('id', user.id);
    
    if (error) {
      console.log(error);
      return;
    }
    let { username:temp } = data[0]; 
    if (temp == null) {
      setRedirectRoute('/timer');
    } else {
      setRedirectRoute('/feed');
    }
  }

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <Redirect href='/feed'/>
  )
}
  