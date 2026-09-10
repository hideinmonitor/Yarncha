export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  __InternalSupabase: { PostgrestVersion: "13.0.4" };
  public: {
    Tables: {
      knitting_projects: Table<
        { id: string; user_id: string; local_id: string; title: string; description: string; language: string; craft_type: "knitting" | "crochet" | "shared"; project_data: Json; created_at: string; updated_at: string },
        { id?: string; user_id: string; local_id: string; title: string; description?: string; language?: string; craft_type?: "knitting" | "crochet" | "shared"; project_data?: Json; created_at?: string; updated_at?: string },
        { id?: string; user_id?: string; local_id?: string; title?: string; description?: string; language?: string; craft_type?: "knitting" | "crochet" | "shared"; project_data?: Json; created_at?: string; updated_at?: string }
      >;
      chart_uploads: Table<
        { id: string; project_id: string; user_id: string; image_url: string; storage_path: string; original_filename: string; mime_type: string | null; status: "uploaded" | "processing" | "completed" | "failed"; detected_rows: number | null; detected_columns: number | null; legend_json: Json; error_message: string | null; created_at: string },
        { id?: string; project_id: string; user_id: string; image_url: string; storage_path: string; original_filename: string; mime_type?: string | null; status?: "uploaded" | "processing" | "completed" | "failed"; detected_rows?: number | null; detected_columns?: number | null; legend_json?: Json; error_message?: string | null; created_at?: string },
        { project_id?: string; user_id?: string; image_url?: string; storage_path?: string; original_filename?: string; mime_type?: string | null; status?: "uploaded" | "processing" | "completed" | "failed"; detected_rows?: number | null; detected_columns?: number | null; legend_json?: Json; error_message?: string | null }
      >;
      chart_cells: Table<
        { id: string; upload_id: string; row_number: number; column_number: number; symbol: string; meaning: string; confidence: number | null; is_user_corrected: boolean; created_at: string },
        { id?: string; upload_id: string; row_number: number; column_number: number; symbol?: string; meaning?: string; confidence?: number | null; is_user_corrected?: boolean; created_at?: string },
        { upload_id?: string; row_number?: number; column_number?: number; symbol?: string; meaning?: string; confidence?: number | null; is_user_corrected?: boolean }
      >;
      chart_analyses: Table<
        { id: string; upload_id: string; project_id: string; user_id: string; model_name: string | null; status: "uploaded" | "processing" | "completed" | "failed"; confidence_label: string; warnings: Json; raw_result: Json; created_at: string },
        { id?: string; upload_id: string; project_id: string; user_id: string; model_name?: string | null; status?: "uploaded" | "processing" | "completed" | "failed"; confidence_label?: string; warnings?: Json; raw_result?: Json; created_at?: string },
        { upload_id?: string; project_id?: string; user_id?: string; model_name?: string | null; status?: "uploaded" | "processing" | "completed" | "failed"; confidence_label?: string; warnings?: Json; raw_result?: Json }
      >;
    };
    Views: { [_ in never]: never };
    Functions: {
      reserve_chart_analysis: {
        Args: { p_upload_id: string; p_idempotency_key: string; p_feature?: string; p_short_limit?: number; p_daily_limit?: number; p_global_daily_limit?: number; p_stale_after_seconds?: number };
        Returns: Json;
      };
      finalize_chart_analysis: {
        Args: { p_ledger_id: string; p_status: string; p_response?: Json; p_error_message?: string | null; p_input_tokens?: number | null; p_output_tokens?: number | null; p_estimated_cost_usd?: number | null };
        Returns: boolean;
      };
    };
    Enums: {
      chart_upload_status: "uploaded" | "processing" | "completed" | "failed";
      yarncha_craft_type: "knitting" | "crochet" | "shared";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
