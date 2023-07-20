import { Redirect } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function IndexPage() {
  return <Redirect href='/feed'/>
}