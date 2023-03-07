declare namespace IOST {
  declare namespace Response {
    type NodeInfo = {
      build_time: string
      git_hash: string
      mode: string
      network: {
        id: string
        peer_count: number
      }
      code_version: string
      server_time: string
    }
    type ChainInfo = {
      net_name: string
      protocol_version: string
      chain_id: number
      head_block: string
      head_block_hash: string
      lib_block: string
      lib_block_hash: string
      witness_list: string[]
      lib_witness_list: string[]
      pending_witness_list: string[]
      head_block_time: string
      lib_block_time: string
    }
    type Block = {
      status: string
      block: {
        hash: string
        version: string
        parent_hash: string
        tx_merkle_hash: string
        tx_receipt_merkle_hash: string
        number: string
        witness: string
        time: string
        gas_usage: number
        tx_count: string
        info: Info
        transactions: Tx[]
      }
    }

    type Info = {
      mode: 0 | 1
      thread: number
      batch_index: number[]
    }

    type TokenInfo = {
      symbol: string
      full_name: string
      issuer: string
      total_supply: string
      current_supply: string
      decimal: number
      can_transfer: boolean
      only_issuer_can_transfer: boolean
      total_supply_float: number
      current_supply_float: number
    }
    type TokenBalance = {
      balance: number
      frozen_balances: FrozenBalance[]
    }
    type Token721Balance = {
      balance: string
      tokenIDs: string[]
    }
    type Token721Metadata = {
      metadata: string
    }
    type Token721Owner = {
      owner: string
    }
    type Contract = {
      id: string
      code: string
      language: string
      version: string
      abis: Abi[]
    }

    type Abi = {
      name: string
      args: string[]
      amount_limit: AmountLimit[]
      description?: string
    }

    type Storage = {
      data: string
      block_hash: string
      block_number: string
    }

    type StorageFields = {
      fields: string[]
      block_hash: string
      block_number: string
    }

    type GasInfo = {
      current_total: number
      increase_speed: number
      limit: number
      pledge_gas: number
      pledged_info: PledgedInfo[]
      transferable_gas: number
    }

    type RamInfo = {
      available: string
      used: string
      total: string
    }

    type PledgedInfo = {
      pledger: string
      amount: number
    }

    type Group = {
      name: string
      items: PermissionItem[]
    }

    type Permission<T> = {
      name: T
      group_names: string[]
      items: PermissionItem[]
      threshold: string
    }

    type PermissionItem = {
      id: string
      is_key_pair: boolean
      weight: number
      permission: string
    }

    type AccountInfo = {
      name: string
      balance: number
      gas_info: GasInfo
      ram_info: RamInfo
      permissions: {
        active: Permission<'active'>
        owner: Permission<'owner'>
        [key: string]: Permission<string>
      }
      groups: Group[]
      frozen_balances: FrozenBalance[]
      vote_infos: VoteInfo[]
    }

    type VoteInfo = {
      option: string
      votes: string
      cleared_votes: string
    }

    type FrozenBalance = {
      amount: number
      time: string
    }

    type Tx = {
      status: string
      transaction: {
        hash: string
        time: string
        expiration: string
        gas_ratio: number
        gas_limit: number
        delay: string
        chain_id: number
        actions: { contract: string; action_name: string; data: string }[]
        signers: []
        publisher: string
        referred_tx: string
        amount_limit: AmountLimit[]
        tx_receipt: TxReceipt
      }
      block_number: string
    }
    type TxReceipt = {
      tx_hash: string
      gas_usage: number
      status_code: string
      message: string
      ram_usage: { [key: string]: string }
      returns: string[]
      receipts: Receipt[]
    }

    type Receipt = {
      func_name: string
      content: string
    }

    type GasRatio = {
      lowest_gas_ratio: number
      median_gas_ratio: number
    }
    type RAMInfo = {
      used_ram: string
      available_ram: string
      total_ram: string
      sell_price: number
      buy_price: number
    }
  }
}
