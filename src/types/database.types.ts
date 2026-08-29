export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          username: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          user_id: string;
          role: "student" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          role?: "student" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          role?: "student" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { app_role: "student" | "admin" };
    CompositeTypes: { [_ in never]: never };
  };
};
