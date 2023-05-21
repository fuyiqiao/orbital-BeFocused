import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'

const projectUrl = "https://zgthnszoxpnuentossny.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpndGhuc3pveHBudWVudG9zc255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1Nzc4MzYsImV4cCI6MjAwMDE1MzgzNn0.8ZLd11Ryi-99y2yHaONbBhw4HjNiFyB_vZ-83PL6hDc"

export const supabase = createClient(projectUrl, projectKey, {
    auth: {
        storage: AsyncStorage,
    }
});