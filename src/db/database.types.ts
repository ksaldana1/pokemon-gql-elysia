export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      pokemon: {
        Row: {
          base_experience: number
          height: number
          id: number
          identifier: string
          is_default: boolean
          order: number
          species_id: number
          weight: number
        }
        Insert: {
          base_experience: number
          height: number
          id?: number
          identifier: string
          is_default: boolean
          order: number
          species_id: number
          weight: number
        }
        Update: {
          base_experience?: number
          height?: number
          id?: number
          identifier?: string
          is_default?: boolean
          order?: number
          species_id?: number
          weight?: number
        }
        Relationships: []
      }
      pokemon_colors: {
        Row: {
          id: number
          identifier: string | null
        }
        Insert: {
          id?: number
          identifier?: string | null
        }
        Update: {
          id?: number
          identifier?: string | null
        }
        Relationships: []
      }
      pokemon_shapes: {
        Row: {
          id: number
          identifier: string | null
        }
        Insert: {
          id?: number
          identifier?: string | null
        }
        Update: {
          id?: number
          identifier?: string | null
        }
        Relationships: []
      }
      pokemon_species: {
        Row: {
          base_happiness: number | null
          capture_rate: number | null
          color_id: number | null
          conquest_order: number | null
          evolution_chain_id: number | null
          evolves_from_species_id: number | null
          forms_switchable: boolean | null
          gender_rate: number | null
          generation_id: number | null
          growth_rate_id: number | null
          habitat_id: number | null
          has_gender_differences: boolean | null
          hatch_counter: number | null
          id: number
          identifier: string
          is_baby: boolean | null
          order: number | null
          shape_id: number | null
        }
        Insert: {
          base_happiness?: number | null
          capture_rate?: number | null
          color_id?: number | null
          conquest_order?: number | null
          evolution_chain_id?: number | null
          evolves_from_species_id?: number | null
          forms_switchable?: boolean | null
          gender_rate?: number | null
          generation_id?: number | null
          growth_rate_id?: number | null
          habitat_id?: number | null
          has_gender_differences?: boolean | null
          hatch_counter?: number | null
          id?: number
          identifier: string
          is_baby?: boolean | null
          order?: number | null
          shape_id?: number | null
        }
        Update: {
          base_happiness?: number | null
          capture_rate?: number | null
          color_id?: number | null
          conquest_order?: number | null
          evolution_chain_id?: number | null
          evolves_from_species_id?: number | null
          forms_switchable?: boolean | null
          gender_rate?: number | null
          generation_id?: number | null
          growth_rate_id?: number | null
          habitat_id?: number | null
          has_gender_differences?: boolean | null
          hatch_counter?: number | null
          id?: number
          identifier?: string
          is_baby?: boolean | null
          order?: number | null
          shape_id?: number | null
        }
        Relationships: []
      }
      pokemon_types: {
        Row: {
          id: number
          slot: number
          type_id: number
        }
        Insert: {
          id?: number
          slot: number
          type_id: number
        }
        Update: {
          id?: number
          slot?: number
          type_id?: number
        }
        Relationships: []
      }
      types: {
        Row: {
          damage_class_id: number | null
          generation_id: number
          id: number
          identifier: string
        }
        Insert: {
          damage_class_id?: number | null
          generation_id: number
          id?: number
          identifier: string
        }
        Update: {
          damage_class_id?: number | null
          generation_id?: number
          id?: number
          identifier?: string
        }
        Relationships: []
      }
    }
    Views: {
      pokemon_with_type: {
        Row: {
          color: string | null
          id: number | null
          identifier: string | null
          shape: string | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
