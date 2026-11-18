"""Plugin do Blender: Adicionar > Malha > Tanque Sherman M4A3(75)W.

Instalação: Editar > Preferências > Complementos (Add-ons) > seta no canto > Instalar do disco...
e escolha o arquivo sherman_blender_addon.zip. Depois, na janela 3D: Shift+A > Malha > Tanque Sherman,
ou a aba "Sherman" na barra lateral (tecla N).
"""
bl_info = {
    'name': 'Tanque Sherman M4A3(75)W',
    'author': 'J',
    'version': (1, 0, 0),
    'blender': (4, 2, 0),
    'location': 'Vista 3D > Adicionar > Malha > Tanque Sherman  |  Barra lateral (N) > Sherman',
    'description': 'Gera um Sherman M4A3(75)W detalhado em escala real, com materiais e animação',
    'category': 'Add Mesh',
}

if 'bpy' in locals():
    import importlib
    importlib.reload(construir)  # noqa: F821
else:
    from . import construir

import bpy
from bpy.props import BoolProperty


class SHERMAN_OT_adicionar(bpy.types.Operator):
    """Cria um tanque Sherman M4A3(75)W em escala real (5,9 m)"""
    bl_idname = 'mesh.adicionar_sherman'
    bl_label = 'Tanque Sherman'
    bl_options = {'REGISTER', 'UNDO'}

    saias: BoolProperty(name='Saias de areia', default=True)
    marcas: BoolProperty(name='Estrela e número', default=True)
    animar: BoolProperty(name='Animação (torre e rodas)', default=True)

    def execute(self, context):
        col = bpy.data.collections.new('Sherman')
        context.scene.collection.children.link(col)
        raiz = construir.construir_sherman(col, saias=self.saias, marcas=self.marcas, animar=self.animar)
        raiz.location = context.scene.cursor.location
        self.report({'INFO'}, 'Sherman criado')
        return {'FINISHED'}


class SHERMAN_PT_painel(bpy.types.Panel):
    bl_label = 'Tanque Sherman'
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Sherman'

    def draw(self, context):
        col = self.layout.column()
        col.operator(SHERMAN_OT_adicionar.bl_idname, icon='AUTO')
        col.label(text='M4A3(75)W — escala 1:1 (metros)')
        col.label(text='Gire o vazio "Torre" e "Canhão"')


def menu(self, context):
    self.layout.operator(SHERMAN_OT_adicionar.bl_idname, icon='AUTO')


CLASSES = (SHERMAN_OT_adicionar, SHERMAN_PT_painel)


def register():
    for c in CLASSES:
        bpy.utils.register_class(c)
    bpy.types.VIEW3D_MT_mesh_add.append(menu)


def unregister():
    bpy.types.VIEW3D_MT_mesh_add.remove(menu)
    for c in reversed(CLASSES):
        bpy.utils.unregister_class(c)
