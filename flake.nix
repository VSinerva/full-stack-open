{
  inputs.nixpkgs.url = "nixpkgs";
  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      br-bg = pkgs.writeScriptBin "br-bg" "${pkgs.bruno}/bin/bruno 1>/dev/null 2>&1 &";
      ff-bg = pkgs.writeScriptBin "ff-bg" "${pkgs.firefox-devedition}/bin/firefox-devedition 1>/dev/null 2>&1 &";
    in
    {
      # Utilized by `nix develop`
      devShell.${system} = pkgs.mkShell {
        buildInputs =
          (with pkgs; [
            bruno
            firefox-devedition
            nodejs_22
            openssl
            cacert
          ])
          ++ [
            br-bg
            ff-bg
          ];
        shellHook = ''zsh'';
      };
    };
}
